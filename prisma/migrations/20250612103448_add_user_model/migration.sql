/*
  Warnings:

  - A unique constraint covering the columns `[nome,userId]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_userId_key" ON "Categoria"("nome", "userId");
