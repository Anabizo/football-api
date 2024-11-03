/*
  Warnings:

  - You are about to drop the `EstatisticasJogador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EstatisticasTime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Jogador` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EstatisticasJogador" DROP CONSTRAINT "EstatisticasJogador_jogadorId_fkey";

-- DropForeignKey
ALTER TABLE "EstatisticasTime" DROP CONSTRAINT "EstatisticasTime_timeId_fkey";

-- DropForeignKey
ALTER TABLE "Jogador" DROP CONSTRAINT "Jogador_timeId_fkey";

-- DropTable
DROP TABLE "EstatisticasJogador";

-- DropTable
DROP TABLE "EstatisticasTime";

-- DropTable
DROP TABLE "Jogador";

-- CreateTable
CREATE TABLE "PartidaId" (
    "id" SERIAL NOT NULL,
    "timeMandanteId" INTEGER NOT NULL,
    "timeVisitanteId" INTEGER NOT NULL,
    "placarMandante" INTEGER NOT NULL,
    "placarVisitante" INTEGER NOT NULL,
    "dataRealizacao" TIMESTAMP(3) NOT NULL,
    "horaRealizacao" TIMESTAMP(3) NOT NULL,
    "nomeEstadio" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "chutesMandante" INTEGER NOT NULL,
    "chutesVisitante" INTEGER NOT NULL,
    "chutesAGolMandante" INTEGER NOT NULL,
    "chutesAGolVisitante" INTEGER NOT NULL,
    "posseDeBolaMandante" DOUBLE PRECISION NOT NULL,
    "posseDeBolaVisitante" DOUBLE PRECISION NOT NULL,
    "passesMandante" INTEGER NOT NULL,
    "passesVisitante" INTEGER NOT NULL,
    "precisaoPassesMandante" DOUBLE PRECISION NOT NULL,
    "precisaoPassesVisitante" DOUBLE PRECISION NOT NULL,
    "faltasMandante" INTEGER NOT NULL,
    "faltasVisitante" INTEGER NOT NULL,
    "impedimentosMandante" INTEGER NOT NULL,
    "impedimentosVisitante" INTEGER NOT NULL,
    "escanteiosMandante" INTEGER NOT NULL,
    "escanteiosVisitante" INTEGER NOT NULL,
    "escalacaoVisitanteId" INTEGER NOT NULL,
    "escalacaoMandanteId" INTEGER NOT NULL,

    CONSTRAINT "PartidaId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EscalacaoVisitante" (
    "id" SERIAL NOT NULL,
    "tecnico" TEXT NOT NULL,

    CONSTRAINT "EscalacaoVisitante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JogadorTitularVisitante" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "numeroCamiseta" INTEGER NOT NULL,
    "posicao" TEXT NOT NULL,
    "siglaPosicao" TEXT NOT NULL,
    "escalacaoId" INTEGER NOT NULL,

    CONSTRAINT "JogadorTitularVisitante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EscalacaoMandante" (
    "id" SERIAL NOT NULL,
    "tecnico" TEXT NOT NULL,

    CONSTRAINT "EscalacaoMandante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JogadorTitularMandante" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "numeroCamiseta" INTEGER NOT NULL,
    "posicao" TEXT NOT NULL,
    "siglaPosicao" TEXT NOT NULL,
    "escalacaoId" INTEGER NOT NULL,

    CONSTRAINT "JogadorTitularMandante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartaoVermelhoMandante" (
    "id" SERIAL NOT NULL,
    "nomeAtleta" TEXT NOT NULL,
    "minuto" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,
    "partidaId" INTEGER NOT NULL,

    CONSTRAINT "CartaoVermelhoMandante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartaoVermelhoVisitante" (
    "id" SERIAL NOT NULL,
    "nomeAtleta" TEXT NOT NULL,
    "minuto" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,
    "partidaId" INTEGER NOT NULL,

    CONSTRAINT "CartaoVermelhoVisitante_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PartidaId" ADD CONSTRAINT "PartidaId_escalacaoMandanteId_fkey" FOREIGN KEY ("escalacaoMandanteId") REFERENCES "EscalacaoMandante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartidaId" ADD CONSTRAINT "PartidaId_escalacaoVisitanteId_fkey" FOREIGN KEY ("escalacaoVisitanteId") REFERENCES "EscalacaoVisitante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JogadorTitularVisitante" ADD CONSTRAINT "JogadorTitularVisitante_escalacaoId_fkey" FOREIGN KEY ("escalacaoId") REFERENCES "EscalacaoVisitante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JogadorTitularMandante" ADD CONSTRAINT "JogadorTitularMandante_escalacaoId_fkey" FOREIGN KEY ("escalacaoId") REFERENCES "EscalacaoMandante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartaoVermelhoMandante" ADD CONSTRAINT "CartaoVermelhoMandante_partidaId_fkey" FOREIGN KEY ("partidaId") REFERENCES "PartidaId"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartaoVermelhoVisitante" ADD CONSTRAINT "CartaoVermelhoVisitante_partidaId_fkey" FOREIGN KEY ("partidaId") REFERENCES "PartidaId"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
