/*
  Warnings:

  - You are about to drop the `EventosJogo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Jogos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lesoes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EstatisticasJogador" DROP CONSTRAINT "EstatisticasJogador_jogoId_fkey";

-- DropForeignKey
ALTER TABLE "EstatisticasTime" DROP CONSTRAINT "EstatisticasTime_jogoId_fkey";

-- DropForeignKey
ALTER TABLE "EventosJogo" DROP CONSTRAINT "EventosJogo_jogadorId_fkey";

-- DropForeignKey
ALTER TABLE "EventosJogo" DROP CONSTRAINT "EventosJogo_jogoId_fkey";

-- DropForeignKey
ALTER TABLE "Jogos" DROP CONSTRAINT "Jogos_campeonatoId_fkey";

-- DropForeignKey
ALTER TABLE "Jogos" DROP CONSTRAINT "Jogos_timeCasaId_fkey";

-- DropForeignKey
ALTER TABLE "Jogos" DROP CONSTRAINT "Jogos_timeVisitanteId_fkey";

-- DropForeignKey
ALTER TABLE "Lesoes" DROP CONSTRAINT "Lesoes_jogadorId_fkey";

-- DropForeignKey
ALTER TABLE "Lesoes" DROP CONSTRAINT "Lesoes_jogoId_fkey";

-- DropTable
DROP TABLE "EventosJogo";

-- DropTable
DROP TABLE "Jogos";

-- DropTable
DROP TABLE "Lesoes";

-- CreateTable
CREATE TABLE "Partida" (
    "partida_id" INTEGER NOT NULL,
    "time_mandante_id" INTEGER NOT NULL,
    "time_mandante_nome" TEXT NOT NULL,
    "time_mandante_sigla" TEXT NOT NULL,
    "time_mandante_escudo" TEXT NOT NULL,
    "time_visitante_id" INTEGER NOT NULL,
    "time_visitante_nome" TEXT NOT NULL,
    "time_visitante_sigla" TEXT NOT NULL,
    "time_visitante_escudo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "data_realizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partida_pkey" PRIMARY KEY ("partida_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partida_partida_id_key" ON "Partida"("partida_id");

-- CreateIndex
CREATE UNIQUE INDEX "Partida_slug_key" ON "Partida"("slug");
