import { Move } from "@prisma/client";
import { BattlePokemon } from "../class/BattlePokemon.class";

export const handleHealing = (battlePokemons:BattlePokemon[],move:Move):number => {
    const healing_amount = move.healing_amount / 100 * battlePokemons[0].getMaxHp();
    return healing_amount
}