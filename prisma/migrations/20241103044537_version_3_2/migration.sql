/*
  Warnings:

  - Added the required column `timeMandanteNome` to the `PartidaId` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeVisitanteNome` to the `PartidaId` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PartidaId" ADD COLUMN     "timeMandanteNome" TEXT NOT NULL,
ADD COLUMN     "timeVisitanteNome" TEXT NOT NULL;
