/*
  Warnings:

  - Added the required column `cartaoId` to the `CartaoVermelhoMandante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cartaoId` to the `CartaoVermelhoVisitante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartaoVermelhoMandante" ADD COLUMN     "cartaoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CartaoVermelhoVisitante" ADD COLUMN     "cartaoId" INTEGER NOT NULL;
