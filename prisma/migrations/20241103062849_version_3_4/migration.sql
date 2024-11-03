/*
  Warnings:

  - Added the required column `atletaId` to the `JogadorTitularMandante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atletaId` to the `JogadorTitularVisitante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JogadorTitularMandante" ADD COLUMN     "atletaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "JogadorTitularVisitante" ADD COLUMN     "atletaId" INTEGER NOT NULL;
