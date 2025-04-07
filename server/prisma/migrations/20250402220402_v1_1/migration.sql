/*
  Warnings:

  - You are about to drop the `pokemon_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "pokemon_info";

-- CreateTable
CREATE TABLE "player" (
    "player_id" TEXT NOT NULL,
    "name" VARCHAR(10) NOT NULL
);

-- CreateTable
CREATE TABLE "team_pokemon" (
    "player_id" TEXT NOT NULL,
    "pokemon_index" INTEGER NOT NULL,
    "pokemon_id" INTEGER NOT NULL,
    "level" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "pokemon" (
    "pokemon_id" INTEGER NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "base_hp" INTEGER NOT NULL,
    "base_attack" INTEGER NOT NULL,
    "base_defence" INTEGER NOT NULL,
    "base_special_attack" INTEGER NOT NULL,
    "base_special_defence" INTEGER NOT NULL,
    "base_speed" INTEGER NOT NULL,

    CONSTRAINT "pokemon_pkey" PRIMARY KEY ("pokemon_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "player_player_id_key" ON "player"("player_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_pokemon_player_id_key" ON "team_pokemon"("player_id");

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_pokemon_id_key" ON "pokemon"("pokemon_id");
