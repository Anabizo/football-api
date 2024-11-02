/*
  Warnings:

  - A unique constraint covering the columns `[timeId,campeonatoId]` on the table `Estatisticas` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Estatisticas_timeId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Estatisticas_timeId_campeonatoId_key" ON "Estatisticas"("timeId", "campeonatoId");
