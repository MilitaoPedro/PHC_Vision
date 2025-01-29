-- CreateEnum
CREATE TYPE "Prioridade" AS ENUM ('Baixa', 'Média', 'Alta');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Todo', 'Doing', 'Done');

-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id_projeto" TEXT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT,
    "data_prevista" TIMESTAMP(3),
    "id_administrador" TEXT NOT NULL,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id_projeto")
);

-- CreateTable
CREATE TABLE "Tarefa" (
    "id_tarefa" TEXT NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "descricao" TEXT,
    "prioridade" "Prioridade" NOT NULL,
    "status" "Status" NOT NULL,
    "id_projeto" TEXT NOT NULL,
    "id_responsavel" TEXT NOT NULL,

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id_tarefa")
);

-- CreateTable
CREATE TABLE "MembrosDoProjeto" (
    "id_projeto" TEXT NOT NULL,
    "id_usuario" TEXT NOT NULL,

    CONSTRAINT "MembrosDoProjeto_pkey" PRIMARY KEY ("id_projeto","id_usuario")
);

-- CreateTable
CREATE TABLE "_MembrosDoProjeto" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MembrosDoProjeto_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "_MembrosDoProjeto_B_index" ON "_MembrosDoProjeto"("B");

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_id_administrador_fkey" FOREIGN KEY ("id_administrador") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "Projeto"("id_projeto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_id_responsavel_fkey" FOREIGN KEY ("id_responsavel") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembrosDoProjeto" ADD CONSTRAINT "MembrosDoProjeto_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "Projeto"("id_projeto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembrosDoProjeto" ADD CONSTRAINT "MembrosDoProjeto_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MembrosDoProjeto" ADD CONSTRAINT "_MembrosDoProjeto_A_fkey" FOREIGN KEY ("A") REFERENCES "Projeto"("id_projeto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MembrosDoProjeto" ADD CONSTRAINT "_MembrosDoProjeto_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;
