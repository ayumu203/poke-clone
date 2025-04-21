import { move_getter } from "../../move/move";
import { pokemon_getter } from "../../pokemon/pokemon";
import { team_pokemon_exist, team_pokemon_getter } from "../../teamPokemon/teamPokemonHandler";
import { BattlePokemon } from "../../../class/BattlePokemon.class";
import { team_pokemon_count, wild_pokemon_count } from "../../../const/pokemon_count.const";
import { POKEMON_ID_BEGIN, POKEMON_ID_END } from "../../../const/pokemon_id.const";
import { battle } from "../../../types/battle.type";
import { MAX_MOVE_COUNT } from "../../../const/max_move_count.const";

export const fetchInitializedGameData = async (player_id:string):Promise<battle> => {
    const battlePokemons = [];
    let moves = [];
    for(let i = 0; i < team_pokemon_count; i++){
        const exist = await team_pokemon_exist(player_id,i);
        if(exist){
            const team_pokemon = await team_pokemon_getter(player_id,i);
            if(team_pokemon){
                const pokemon_id = team_pokemon.pokemon_id;
                const pokemon = await pokemon_getter(Number(pokemon_id));
                if(!pokemon)continue;
                battlePokemons.push(new BattlePokemon({
                    pokemon: pokemon,
                    pokemon_index: i,
                    level: team_pokemon.level,
                    exp: team_pokemon.exp,
                    image: pokemon.back_image,
                }));
                battlePokemons[i].setMoveList(team_pokemon.move_list);
                for(let j = 0; j < MAX_MOVE_COUNT; j++){
                    const move_id = team_pokemon.move_list[j];
                    const move = await move_getter(Number(move_id));
                    if(!move)continue;
                    moves.push(move);
                }
            }
        }
    }

    // 野生ポケモンの出現数
    const begin = POKEMON_ID_BEGIN;
    const end = POKEMON_ID_END;
    const wildPokemons = [];
    for(let i = 0; i < wild_pokemon_count; i++){
        const random = Math.floor(Math.random() * (end - begin + 1)) + begin;
        const pokemon = await pokemon_getter(random);
        if(!pokemon)continue;
        wildPokemons.push(new BattlePokemon({
            pokemon: pokemon,
            pokemon_index: i,
            level: Math.floor(Math.random() * battlePokemons[0].getLevel() + 3) + 0,
            exp: 0,
            image: pokemon.front_image,
        }));
        for(let j = 0; j <= MAX_MOVE_COUNT; j++){
            const move_id = pokemon.move_list[j];
            const move = await move_getter(Number(move_id));
            if(!move)continue;
            moves.push(move);
        }
    }
    ;
    return {
        battlePokemons,
        wildPokemons,
        moves,
        endFlag: false,
        message: [],
    }
}

