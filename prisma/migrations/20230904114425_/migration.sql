/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Credentials" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_id_key" ON "Credentials"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_titulo_key" ON "Credentials"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
