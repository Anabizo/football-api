-- CreateTable
CREATE TABLE "CartaoAmareloMandante" (
    "id" SERIAL NOT NULL,
    "cartaoId" INTEGER NOT NULL,
    "nomeAtleta" TEXT NOT NULL,
    "minuto" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,
    "partidaId" INTEGER NOT NULL,

    CONSTRAINT "CartaoAmareloMandante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartaoAmareloVisitante" (
    "id" SERIAL NOT NULL,
    "cartaoId" INTEGER NOT NULL,
    "nomeAtleta" TEXT NOT NULL,
    "minuto" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,
    "partidaId" INTEGER NOT NULL,

    CONSTRAINT "CartaoAmareloVisitante_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartaoAmareloMandante" ADD CONSTRAINT "CartaoAmareloMandante_partidaId_fkey" FOREIGN KEY ("partidaId") REFERENCES "PartidaId"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartaoAmareloVisitante" ADD CONSTRAINT "CartaoAmareloVisitante_partidaId_fkey" FOREIGN KEY ("partidaId") REFERENCES "PartidaId"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
