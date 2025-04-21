import { pokemon_getter } from "../../api/pokemon/pokemon";
import { BattlePokemon } from "../../class/BattlePokemon.class";
import { MAX_MOVE_COUNT } from "../../const/max_move_count.const";
import { Pokemon } from "../../types/pokemon.types";

// オブジェクトの配列になったbattlePokemonsをbattlePokemonクラスの配列に変換する
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
        battlePokemon.getRank().setAttackRank(battlePokemons[i].rank.attack);
        battlePokemon.getRank().setdefenceRank(battlePokemons[i].rank.defence);
        battlePokemon.getRank().setSpecialAttackRank(battlePokemons[i].rank.special_attack);
        battlePokemon.getRank().setSpecialdefenceRank(battlePokemons[i].rank.special_defence);
        battlePokemon.getRank().setSpeedRank(battlePokemons[i].rank.speed);
        battlePokemon.getRank().setAccuracyRank(battlePokemons[i].rank.accuracy);
        battlePokemon.setMoveList(battlePokemons[i].move_list);
    }
    return battlePokemonList;
}