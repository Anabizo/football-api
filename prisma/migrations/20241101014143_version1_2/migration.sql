/*
  Warnings:

  - You are about to drop the `Classificacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Campeonato" DROP CONSTRAINT "Campeonato_classificacaoId_fkey";

-- DropForeignKey
ALTER TABLE "Estatisticas" DROP CONSTRAINT "Estatisticas_classificacaoId_fkey";

-- DropTable
DROP TABLE "Classificacao";
