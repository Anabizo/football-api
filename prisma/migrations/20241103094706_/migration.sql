-- AlterTable
ALTER TABLE "PartidaId" ADD COLUMN "partida_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "PartidaId_partida_id_key" ON "PartidaId"("partida_id");

