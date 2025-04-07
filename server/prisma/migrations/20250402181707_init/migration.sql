-- CreateTable
CREATE TABLE "pokemon_info" (
    "pokemon_id" INTEGER NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "base_hp" INTEGER NOT NULL,
    "base_attack" INTEGER NOT NULL,
    "base_defence" INTEGER NOT NULL,
    "base_special_attack" INTEGER NOT NULL,
    "base_special_defence" INTEGER NOT NULL,
    "base_speed" INTEGER NOT NULL,

    CONSTRAINT "pokemon_info_pkey" PRIMARY KEY ("pokemon_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pokemon_info_pokemon_id_key" ON "pokemon_info"("pokemon_id");
