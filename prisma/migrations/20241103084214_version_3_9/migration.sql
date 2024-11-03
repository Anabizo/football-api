/*
  Warnings:

  - You are about to drop the column `dataRealizacao` on the `PartidaId` table. All the data in the column will be lost.
  - You are about to drop the column `horaRealizacao` on the `PartidaId` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PartidaId" DROP COLUMN "dataRealizacao",
DROP COLUMN "horaRealizacao";
