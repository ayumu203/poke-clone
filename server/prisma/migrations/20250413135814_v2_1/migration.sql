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
    "level" INTEGER NOT NULL,
    "exp" INTEGER NOT NULL,
    "move_list" INTEGER[]
);

-- CreateTable
CREATE TABLE "pokemon" (
    "pokemon_id" INTEGER NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "type" VARCHAR(10) NOT NULL,
    "front_image" TEXT NOT NULL,
    "back_image" TEXT NOT NULL,
    "base_hp" INTEGER NOT NULL,
    "base_attack" INTEGER NOT NULL,
    "base_defence" INTEGER NOT NULL,
    "base_special_attack" INTEGER NOT NULL,
    "base_special_defence" INTEGER NOT NULL,
    "base_speed" INTEGER NOT NULL,
    "evolve_level" INTEGER NOT NULL,
    "move_list" INTEGER[],

    CONSTRAINT "pokemon_pkey" PRIMARY KEY ("pokemon_id")
);

-- CreateTable
CREATE TABLE "Move" (
    "move_id" INTEGER NOT NULL,
    "move_category" VARCHAR(20) NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "type" VARCHAR(10) NOT NULL,
    "damage_class" TEXT NOT NULL,
    "power" INTEGER NOT NULL,
    "pp" INTEGER NOT NULL,
    "accuracy" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL,
    "status_name" TEXT[],
    "status_rank" INTEGER[],
    "status_target" TEXT NOT NULL,
    "status_chance" INTEGER NOT NULL,
    "ailment_name" TEXT NOT NULL,
    "ailment_chance" INTEGER NOT NULL,
    "healing_amount" INTEGER NOT NULL,
    "drain_power" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("move_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "player_player_id_key" ON "player"("player_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_pokemon_player_id_pokemon_index_key" ON "team_pokemon"("player_id", "pokemon_index");

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_pokemon_id_key" ON "pokemon"("pokemon_id");

-- CreateIndex
CREATE UNIQUE INDEX "Move_move_id_key" ON "Move"("move_id");
