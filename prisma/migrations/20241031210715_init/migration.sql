/*
  Warnings:

  - You are about to drop the column `name` on the `Time` table. All the data in the column will be lost.
  - You are about to drop the `Jogadores` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nome` to the `Time` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Jogadores" DROP CONSTRAINT "Jogadores_timeId_fkey";

-- AlterTable
ALTER TABLE "Time" DROP COLUMN "name",
ADD COLUMN     "cidade" TEXT,
ADD COLUMN     "estadio" TEXT,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "sigla" TEXT;

-- DropTable
DROP TABLE "Jogadores";

-- CreateTable
CREATE TABLE "Classificacao" (
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

    CONSTRAINT "Classificacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jogos" (
    "id" SERIAL NOT NULL,
    "timeCasaId" INTEGER NOT NULL,
    "timeVisitanteId" INTEGER NOT NULL,
    "placarCasa" INTEGER NOT NULL,
    "placarVisitante" INTEGER NOT NULL,
    "pontosCasa" INTEGER NOT NULL,
    "pontosVisitante" INTEGER NOT NULL,
    "dataJogo" TIMESTAMP(3) NOT NULL,
    "estadio" TEXT,
    "juiz" TEXT,
    "status" TEXT,

    CONSTRAINT "Jogos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstatisticasTime" (
    "id" SERIAL NOT NULL,
    "jogoId" INTEGER NOT NULL,
    "timeId" INTEGER NOT NULL,
    "chutes" INTEGER NOT NULL,
    "chutesGol" INTEGER NOT NULL,
    "posseBola" DOUBLE PRECISION NOT NULL,
    "passes" INTEGER NOT NULL,
    "precisaoPasse" DOUBLE PRECISION NOT NULL,
    "faltas" INTEGER NOT NULL,
    "cartoesAmarelos" INTEGER NOT NULL,
    "cartoesVermelhos" INTEGER NOT NULL,
    "impedimentos" INTEGER NOT NULL,
    "escanteios" INTEGER NOT NULL,

    CONSTRAINT "EstatisticasTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jogador" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "numeroCamisa" INTEGER NOT NULL,
    "posicao" TEXT NOT NULL,
    "timeId" INTEGER NOT NULL,

    CONSTRAINT "Jogador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstatisticasJogador" (
    "id" SERIAL NOT NULL,
    "jogoId" INTEGER NOT NULL,
    "jogadorId" INTEGER NOT NULL,
    "gols" INTEGER NOT NULL,
    "assistencias" INTEGER NOT NULL,
    "cartoesAmarelos" INTEGER NOT NULL,
    "cartoesVermelhos" INTEGER NOT NULL,

    CONSTRAINT "EstatisticasJogador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventosJogo" (
    "id" SERIAL NOT NULL,
    "jogoId" INTEGER NOT NULL,
    "jogadorId" INTEGER NOT NULL,
    "tipoEvento" TEXT NOT NULL,
    "minuto" INTEGER NOT NULL,

    CONSTRAINT "EventosJogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesoes" (
    "id" SERIAL NOT NULL,
    "jogoId" INTEGER NOT NULL,
    "jogadorId" INTEGER NOT NULL,
    "minutoOcorrido" INTEGER NOT NULL,
    "tipoLesao" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Lesoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Classificacao_timeId_key" ON "Classificacao"("timeId");

-- AddForeignKey
ALTER TABLE "Classificacao" ADD CONSTRAINT "Classificacao_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jogos" ADD CONSTRAINT "Jogos_timeCasaId_fkey" FOREIGN KEY ("timeCasaId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jogos" ADD CONSTRAINT "Jogos_timeVisitanteId_fkey" FOREIGN KEY ("timeVisitanteId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstatisticasTime" ADD CONSTRAINT "EstatisticasTime_jogoId_fkey" FOREIGN KEY ("jogoId") REFERENCES "Jogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstatisticasTime" ADD CONSTRAINT "EstatisticasTime_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jogador" ADD CONSTRAINT "Jogador_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstatisticasJogador" ADD CONSTRAINT "EstatisticasJogador_jogoId_fkey" FOREIGN KEY ("jogoId") REFERENCES "Jogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstatisticasJogador" ADD CONSTRAINT "EstatisticasJogador_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "Jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventosJogo" ADD CONSTRAINT "EventosJogo_jogoId_fkey" FOREIGN KEY ("jogoId") REFERENCES "Jogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventosJogo" ADD CONSTRAINT "EventosJogo_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "Jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesoes" ADD CONSTRAINT "Lesoes_jogoId_fkey" FOREIGN KEY ("jogoId") REFERENCES "Jogos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesoes" ADD CONSTRAINT "Lesoes_jogadorId_fkey" FOREIGN KEY ("jogadorId") REFERENCES "Jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
