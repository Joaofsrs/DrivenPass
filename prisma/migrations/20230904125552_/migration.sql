/*
  Warnings:

  - Added the required column `userId` to the `Credentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credentials" ADD COLUMN     "userId" INTEGER NOT NULL;
