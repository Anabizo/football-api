/*
  Warnings:

  - You are about to drop the column `partida_id` on the `PartidaId` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "PartidaId_partida_id_key";

-- AlterTable
ALTER TABLE "PartidaId" DROP COLUMN "partida_id";
