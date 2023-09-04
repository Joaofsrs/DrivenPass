-- CreateTable
CREATE TABLE "Notes" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "node" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Notes_id_key" ON "Notes"("id");
