-- CreateTable
CREATE TABLE "Time" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jogadores" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "timeId" INTEGER,

    CONSTRAINT "Jogadores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Jogadores" ADD CONSTRAINT "Jogadores_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "Time"("id") ON DELETE SET NULL ON UPDATE CASCADE;
