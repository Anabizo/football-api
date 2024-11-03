/*
  Warnings:

  - Added the required column `atletaId` to the `CartaoAmareloMandante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atletaId` to the `CartaoAmareloVisitante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atletaId` to the `CartaoVermelhoMandante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atletaId` to the `CartaoVermelhoVisitante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartaoAmareloMandante" ADD COLUMN     "atletaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CartaoAmareloVisitante" ADD COLUMN     "atletaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CartaoVermelhoMandante" ADD COLUMN     "atletaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CartaoVermelhoVisitante" ADD COLUMN     "atletaId" INTEGER NOT NULL;
