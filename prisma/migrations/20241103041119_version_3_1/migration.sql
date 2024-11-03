/*
  Warnings:

  - Added the required column `golsMandanteId` to the `PartidaId` table without a default value. This is not possible if the table is not empty.
  - Added the required column `golsVisitanteId` to the `PartidaId` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PartidaId" ADD COLUMN     "golsMandanteId" INTEGER NOT NULL,
ADD COLUMN     "golsVisitanteId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "GolsMandante" (
    "id" SERIAL NOT NULL,
    "nomeAtleta" TEXT NOT NULL,
    "minuto" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,

    CONSTRAINT "GolsMandante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GolsVisitante" (
    "id" SERIAL NOT NULL,
    "nomeAtleta" TEXT NOT NULL,
    "minuto" INTEGER NOT NULL,
    "periodo" TEXT NOT NULL,

    CONSTRAINT "GolsVisitante_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PartidaId" ADD CONSTRAINT "PartidaId_golsMandanteId_fkey" FOREIGN KEY ("golsMandanteId") REFERENCES "GolsMandante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartidaId" ADD CONSTRAINT "PartidaId_golsVisitanteId_fkey" FOREIGN KEY ("golsVisitanteId") REFERENCES "GolsVisitante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
