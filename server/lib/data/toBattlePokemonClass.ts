import { pokemon_getter } from "../../api/pokemon/pokemon";
import { BattlePokemon } from "../../class/BattlePokemon.class";
import { Pokemon } from "../../types/pokemon.types";

export const toBattlePokemonClass = async(battlePokemons:BattlePokemon[]) => {
    const battlePokemonList:BattlePokemon[] = [];
    for(let i = 0; i < battlePokemons.length; i++){
        const pokemon:Pokemon = await pokemon_getter(battlePokemons[i].pokemon_id);
        const battlePokemon:BattlePokemon = new BattlePokemon({
        pokemon:pokemon,
        pokemon_index:1,
        level:battlePokemons[i].level,
        exp:battlePokemons[i].exp,
        image:battlePokemons[i].image
        });
        battlePokemon.setCurrentHp(battlePokemons[i].current_hp);
        battlePokemonList.push(battlePokemon);
    }
    return battlePokemonList;
}