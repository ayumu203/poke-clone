/*
  Warnings:

  - Added the required column `is_evolve` to the `pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `move1_id` to the `pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `move2_id` to the `pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Exp` to the `team_pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pokemon" ADD COLUMN     "is_evolve" BOOLEAN NOT NULL,
ADD COLUMN     "move1_id" INTEGER NOT NULL,
ADD COLUMN     "move2_id" INTEGER NOT NULL,
ADD COLUMN     "type" VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE "team_pokemon" ADD COLUMN     "Exp" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Move" (
    "model_id" INTEGER NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "type" VARCHAR(10) NOT NULL,
    "description" TEXT NOT NULL,
    "power" INTEGER NOT NULL,
    "accuracy" INTEGER NOT NULL,
    "pp" INTEGER NOT NULL,
    "status_effect" BOOLEAN NOT NULL,
    "status_name" BOOLEAN NOT NULL,
    "status_rank" INTEGER NOT NULL,
    "ailment_effect" BOOLEAN NOT NULL,
    "ailment_name" TEXT NOT NULL,
    "healing_effect" BOOLEAN NOT NULL,
    "healing_amount" INTEGER NOT NULL,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("model_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Move_model_id_key" ON "Move"("model_id");
