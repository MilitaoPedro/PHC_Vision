const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

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



// Inicia o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});