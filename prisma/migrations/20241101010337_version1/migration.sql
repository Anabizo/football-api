/*
  Warnings:

  - You are about to drop the column `derrotas` on the `Classificacao` table. All the data in the column will be lost.
  - You are about to drop the column `empates` on the `Classificacao` table. All the data in the column will be lost.
  - You are about to drop the column `golsMarcados` on the `Classificacao` table. All the data in the column will be lost.
  - You are about to drop the column `golsSofridos` on the `Classificacao` table. All the data in the column will be lost.
  - You are about to drop the column `jogos` on the `Classificacao` table. All the data in the column will be lost.
  - You are about to drop the column `pontos` on the `Classificacao` table. All the data in the column will be lost.
  - You are about to drop the column `posicao` on the `Classificacao` table. All the data in the column will be lost.
  - You are about to drop the column `saldoGols` on the `Classificacao` table. All the data in the column will be lost.
  - You are about to drop the column `timeId` on the `Classificacao` table. All the data in the column will be lost.
  - You are about to drop the column `vitorias` on the `Classificacao` table. All the data in the column will be lost.
  - Added the required column `campeonatoId` to the `Jogos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Classificacao" DROP CONSTRAINT "Classificacao_timeId_fkey";

-- DropIndex
DROP INDEX "Classificacao_timeId_key";

-- AlterTable
ALTER TABLE "Classificacao" DROP COLUMN "derrotas",
DROP COLUMN "empates",
DROP COLUMN "golsMarcados",
DROP COLUMN "golsSofridos",
DROP COLUMN "jogos",
DROP COLUMN "pontos",
DROP COLUMN "posicao",
DROP COLUMN "saldoGols",
DROP COLUMN "timeId",
DROP COLUMN "vitorias";

-- AlterTable
ALTER TABLE "Jogos" ADD COLUMN     "campeonatoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Time" ADD COLUMN     "escudo" TEXT;

-- CreateTable
CREATE TABLE "Campeonato" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "edicaoAtual" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "logo" TEXT,
    "classificacaoId" INTEGER,

    CONSTRAINT "Campeonato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estatisticas" (
    "id" SERIAL NOT NULL,
    "pontos" INTEGER NOT NULL,
    "jogos" INTEGER NOT NULL,
    "vitorias" INTEGER NOT NULL,
    "derrotas" INTEGER NOT NULL,
    "empates" INTEGER NOT NULL,
    "golsMarcados" INTEGER NOT NULL,
    "golsSofridos" INTEGER NOT NULL,
    "saldoGols" INTEGER NOT NULL,
    "posicao" INTEGER NOT NULL,
    "timeId" INTEGER NOT NULL,
    "nomeTime" TEXT NOT NULL,
    "escudo" TEXT,
    "campeonatoId" INTEGER NOT NULL,
    "classificacaoId" INTEGER NOT NULL,

    CONSTRAINT "Estatisticas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Campeonato_classificacaoId_key" ON "Campeonato"("classificacaoId");

-- CreateIndex
CREATE UNIQUE INDEX "Estatisticas_timeId_key" ON "Estatisticas"("timeId");

-- AddForeignKey
ALTER TABLE "Campeonato" ADD CONSTRAINT "Campeonato_classificacaoId_fkey" FOREIGN KEY ("classificacaoId") REFERENCES "Classificacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estatisticas" ADD CONSTRAINT "Estatisticas_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estatisticas" ADD CONSTRAINT "Estatisticas_classificacaoId_fkey" FOREIGN KEY ("classificacaoId") REFERENCES "Classificacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estatisticas" ADD CONSTRAINT "Estatisticas_campeonatoId_fkey" FOREIGN KEY ("campeonatoId") REFERENCES "Campeonato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jogos" ADD CONSTRAINT "Jogos_campeonatoId_fkey" FOREIGN KEY ("campeonatoId") REFERENCES "Campeonato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
