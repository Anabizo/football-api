-- AlterTable
ALTER TABLE "GolsMandante" ALTER COLUMN "minuto" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "GolsVisitante" ALTER COLUMN "minuto" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PartidaId" ALTER COLUMN "posseDeBolaMandante" SET DATA TYPE TEXT,
ALTER COLUMN "posseDeBolaVisitante" SET DATA TYPE TEXT,
ALTER COLUMN "precisaoPassesMandante" SET DATA TYPE TEXT,
ALTER COLUMN "precisaoPassesVisitante" SET DATA TYPE TEXT;
