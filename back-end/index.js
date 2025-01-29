const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

// Usuario

// Listar todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany({
            select: {
                id_usuario: true,
                nome: true,
                email: true,
                projetosLiderados: {
                    select: {
                        id_projeto: true,
                        nome: true
                    }
                },
                tarefas: {
                    select: {
                        id_tarefa: true,
                        titulo: true
                    }
                }
            },
            orderBy: {
                nome: 'asc'
            }
        });

        return res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return res.status(500).json({ 
            message: 'Erro interno ao buscar usuários',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Atualizar usuário específico
app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;

    try {
        // Validação dos dados de entrada
        if (!nome && !email) {
            return res.status(400).json({
                message: 'Pelo menos um campo (nome ou email) deve ser fornecido'
            });
        }

        // Verificação de email duplicado
        if (email) {
            const emailExistente = await prisma.usuario.findFirst({
                where: {
                    email,
                    NOT: {
                        id_usuario: id
                    }
                }
            });

            if (emailExistente) {
                return res.status(400).json({
                    message: 'Este email já está em uso'
                });
            }
        }

        const usuarioAtualizado = await prisma.usuario.update({
            where: { 
                id_usuario: id 
            },
            data: {
                ...(nome && { nome }),
                ...(email && { email })
            },
            select: {
                id_usuario: true,
                nome: true,
                email: true
            }
        });

        return res.json({
            message: 'Usuário atualizado com sucesso',
            usuario: usuarioAtualizado
        });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        
        if (error.code === 'P2025') {
            return res.status(404).json({
                message: 'Usuário não encontrado'
            });
        }

        return res.status(500).json({
            message: 'Erro interno ao atualizar usuário',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Deletar usuário específico
app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Verifica se o usuário existe e suas relações
        const usuario = await prisma.usuario.findUnique({
            where: { id_usuario: id },
            include: {
                projetosLiderados: true,
                tarefas: true,
                MembrosDoProjeto: true
            }
        });

        if (!usuario) {
            return res.status(404).json({
                message: 'Usuário não encontrado'
            });
        }

        // Verifica se o usuário pode ser deletado
        if (usuario.projetosLiderados.length > 0) {
            return res.status(400).json({
                message: 'Não é possível deletar um usuário que é líder de projetos'
            });
        }

        // Executa a deleção em transação
        await prisma.$transaction([
            // Remove associações de projetos
            prisma.membrosDoProjeto.deleteMany({
                where: { id_usuario: id }
            }),
            // Atualiza tarefas para remover referência
            prisma.tarefa.updateMany({
                where: { id_usuario: id },
                data: { id_usuario: null }
            }),
            // Remove o usuário
            prisma.usuario.delete({
                where: { id_usuario: id }
            })
        ]);

        return res.json({
            message: 'Usuário deletado com sucesso'
        });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        return res.status(500).json({
            message: 'Erro interno ao deletar usuário',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Forneça e-mail e senha' });
    }

    try {
        const user = await prisma.usuario.findUnique({
            where: { email }
        });

        // Verifica se o usuário existe e se a senha está correta
        if (!user || user.senha !== senha) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        return res.json({ message: 'Login bem-sucedido', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});


app.post("/cadastroUsuario", async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const newUser = await prisma.usuario.create({
        data: {
            nome,
            email,
            senha,
        },
        });

        return res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        if (error.code === 'P2002') {
        return res.status(400).json({ message: 'E-mail já está em uso' });
        }
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

app.post('/usuario/id', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await prisma.usuario.findUnique({
            where: { email },
            select: { id_usuario: true }  // Retorna somente o ID
        });

        if (user) {
            return res.json({ id_usuario: usuario.id_usuario });
        } else {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Tarefa

// Criar tarefa
app.post('/tarefa', async (req, res) => {
    const { titulo, descricao, prioridade, status, id_projeto, id_usuario } = req.body;

    try {
        const newTarefa = await prisma.tarefa.create({
            data: {
                titulo,
                descricao,
                prioridade,
                status,
                id_projeto,
                id_usuario
            },
        });
        return res.status(201).json(newTarefa);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar tarefa' });
    }
});

// Listar tarefas por projeto e status
app.get('/tarefas', async (req, res) => {
    const { id_projeto, status } = req.query;

    try {
        // Validação do ID do projeto
        if (id_projeto && !isValidUUID(id_projeto)) {
            return res.status(400).json({ 
                message: 'ID do projeto inválido' 
            });
        }

        const filtros = {};
        
        if (id_projeto) {
            filtros.id_projeto = id_projeto;
        }

        if (status) {
            // Validação do status
            if (!Object.values(Status).includes(status)) {
                return res.status(400).json({ 
                    message: 'Status inválido' 
                });
            }
            filtros.status = status;
        }

        const tarefas = await prisma.tarefa.findMany({
            where: filtros,
            include: {
                responsavel: {
                    select: {
                        id_usuario: true,
                        nome: true,
                        email: true
                    }
                },
                projeto: {
                    select: {
                        nome: true,
                        descricao: true
                    }
                }
            },
            orderBy: {
                prioridade: 'desc'
            }
        });

        return res.json(tarefas);
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        return res.status(500).json({ 
            message: 'Erro interno ao buscar tarefas',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Atualizar tarefa
app.put('/tarefa/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, prioridade, status } = req.body;

    try {
        const updatedTarefa = await prisma.tarefa.update({
            where: { id_tarefa: id },
            data: { titulo, descricao, prioridade, status },
        });
        return res.json(updatedTarefa);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar tarefa' });
    }
});

// Deletar tarefa
app.delete('/tarefa/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.tarefa.delete({
            where: { id_tarefa: id },
        });
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao deletar tarefa' });
    }
});

// Projeto

// Criar projeto
app.post('/criarProjeto', async (req, res) => {
    const { nome, descricao, data_prevista, id_administrador } = req.body;

    try {
        const newProjeto = await prisma.projeto.create({
            data: { 
                nome, 
                descricao, 
                data_prevista: data_prevista ? new Date(data_prevista) : null, // Converte para JS Date
                id_administrador
            }
        });
        return res.status(201).json(newProjeto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar projeto' });
    }
});

app.get('/adminId', async (req, res) => {
    try {
      const projects = await prisma.projeto.findMany({
        where: {
          id_administrador: "dbc599a2-8980-4833-9ade-c84e538720b0"
        }
      });
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch projects" });
    }
  });

// Atualizar projeto
app.put('/projeto/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, data_prevista } = req.body;

    try {
        const updatedProjeto = await prisma.projeto.update({
            where: { id_projeto: id },
            data: { nome, descricao, data_prevista },
        });
        return res.json(updatedProjeto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar projeto' });
    }
});

// Deletar projeto
app.delete('/projeto/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.projeto.delete({
            where: { id_projeto: id },
        });
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao deletar projeto' });
    }
});

app.get('/projeto/:id/membros', async (req, res) => {
    const projetoId = req.params.id;
    try {
        const membros = await prisma.membros.findMany({
            where: {
                id_projeto: projetoId
            }
        });
        res.status(200).json({ count: membros.length });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar membros do projeto" });
    }
});

app.get('/projeto/:id/tarefas', async (req, res) => {
    const projetoId = req.params.id;
    try {
        const tarefas = await prisma.tarefas.findMany({
            where: {
                id_projeto: projetoId
            }
        });
        res.status(200).json({ count: tarefas.length });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar tarefas do projeto" });
    }
});



// Inicia o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});