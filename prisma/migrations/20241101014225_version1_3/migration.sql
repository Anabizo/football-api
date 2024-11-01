/*
  Warnings:

  - You are about to drop the column `classificacaoId` on the `Campeonato` table. All the data in the column will be lost.
  - You are about to drop the column `classificacaoId` on the `Estatisticas` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Campeonato_classificacaoId_key";

-- AlterTable
ALTER TABLE "Campeonato" DROP COLUMN "classificacaoId";

-- AlterTable
ALTER TABLE "Estatisticas" DROP COLUMN "classificacaoId";
