/*
  Warnings:

  - A unique constraint covering the columns `[player_id,pokemon_index]` on the table `team_pokemon` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "team_pokemon_player_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "team_pokemon_player_id_pokemon_index_key" ON "team_pokemon"("player_id", "pokemon_index");
