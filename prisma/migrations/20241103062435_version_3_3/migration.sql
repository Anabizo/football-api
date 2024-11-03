/*
  Warnings:

  - Added the required column `atletaId` to the `GolsMandante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atletaId` to the `GolsVisitante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GolsMandante" ADD COLUMN     "atletaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GolsVisitante" ADD COLUMN     "atletaId" INTEGER NOT NULL;
