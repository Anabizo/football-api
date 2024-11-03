/*
  Warnings:

  - You are about to drop the column `escalacaoMandanteId` on the `PartidaId` table. All the data in the column will be lost.
  - You are about to drop the column `escalacaoVisitanteId` on the `PartidaId` table. All the data in the column will be lost.
  - You are about to drop the column `golsMandanteId` on the `PartidaId` table. All the data in the column will be lost.
  - You are about to drop the column `golsVisitanteId` on the `PartidaId` table. All the data in the column will be lost.
  - You are about to drop the `CartaoAmareloMandante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CartaoAmareloVisitante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CartaoVermelhoMandante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CartaoVermelhoVisitante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EscalacaoMandante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EscalacaoVisitante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GolsMandante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GolsVisitante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JogadorTitularMandante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JogadorTitularVisitante` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CartaoAmareloMandante" DROP CONSTRAINT "CartaoAmareloMandante_partidaId_fkey";

-- DropForeignKey
ALTER TABLE "CartaoAmareloVisitante" DROP CONSTRAINT "CartaoAmareloVisitante_partidaId_fkey";

-- DropForeignKey
ALTER TABLE "CartaoVermelhoMandante" DROP CONSTRAINT "CartaoVermelhoMandante_partidaId_fkey";

-- DropForeignKey
ALTER TABLE "CartaoVermelhoVisitante" DROP CONSTRAINT "CartaoVermelhoVisitante_partidaId_fkey";

-- DropForeignKey
ALTER TABLE "JogadorTitularMandante" DROP CONSTRAINT "JogadorTitularMandante_escalacaoId_fkey";

-- DropForeignKey
ALTER TABLE "JogadorTitularVisitante" DROP CONSTRAINT "JogadorTitularVisitante_escalacaoId_fkey";

-- DropForeignKey
ALTER TABLE "PartidaId" DROP CONSTRAINT "PartidaId_escalacaoMandanteId_fkey";

-- DropForeignKey
ALTER TABLE "PartidaId" DROP CONSTRAINT "PartidaId_escalacaoVisitanteId_fkey";

-- DropForeignKey
ALTER TABLE "PartidaId" DROP CONSTRAINT "PartidaId_golsMandanteId_fkey";

-- DropForeignKey
ALTER TABLE "PartidaId" DROP CONSTRAINT "PartidaId_golsVisitanteId_fkey";

-- AlterTable
ALTER TABLE "PartidaId" DROP COLUMN "escalacaoMandanteId",
DROP COLUMN "escalacaoVisitanteId",
DROP COLUMN "golsMandanteId",
DROP COLUMN "golsVisitanteId";

-- DropTable
DROP TABLE "CartaoAmareloMandante";

-- DropTable
DROP TABLE "CartaoAmareloVisitante";

-- DropTable
DROP TABLE "CartaoVermelhoMandante";

-- DropTable
DROP TABLE "CartaoVermelhoVisitante";

-- DropTable
DROP TABLE "EscalacaoMandante";

-- DropTable
DROP TABLE "EscalacaoVisitante";

-- DropTable
DROP TABLE "GolsMandante";

-- DropTable
DROP TABLE "GolsVisitante";

-- DropTable
DROP TABLE "JogadorTitularMandante";

-- DropTable
DROP TABLE "JogadorTitularVisitante";
