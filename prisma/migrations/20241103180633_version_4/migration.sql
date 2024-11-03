-- CreateTable
CREATE TABLE "Atualizacoes" (
    "id" SERIAL NOT NULL,
    "dataClassificacao" TIMESTAMP(3) NOT NULL,
    "dataPartida" TIMESTAMP(3) NOT NULL,
    "dataPartidaId" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Atualizacoes_pkey" PRIMARY KEY ("id")
);
