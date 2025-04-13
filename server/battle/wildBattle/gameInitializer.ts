import { move_getter } from "../../api/move/move";
import { pokemon_getter } from "../../api/pokemon/pokemon";
import { team_pokemon_exist, team_pokemon_getter } from "../../api/teamPokemon/teamPokemonHandler";
import { BattlePokemon } from "../../class/BattlePokemon.class";
import { team_pokemon_count, wild_pokemon_count } from "../../const/pokemon_count.const";
import { pokemon_id_begin, pokemon_id_end } from "../../const/pokemon_id.const";

export const initGameData = async (player_id:string) => {
    const battlePokemons = [];
    const moves = [];
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
                    image: pokemon.back_image
                }));
                const move1id = pokemon.move1_id;
                const move2id = pokemon.move2_id;
                const move1 = await move_getter(Number(move1id));
                const move2 = await move_getter(Number(move2id));
                moves.push(move1);
                moves.push(move2);
            }
        }
    }
    // 野生ポケモンの出現数
    const begin = pokemon_id_begin;
    const end = pokemon_id_end;
    const wildPokemons = [];
    for(let i = 0; i < wild_pokemon_count; i++){
        const random = Math.floor(Math.random() * (end - begin + 1)) + begin;
        const pokemon = await pokemon_getter(random);
        if(!pokemon)continue;
        wildPokemons.push(new BattlePokemon({
            pokemon: pokemon,
            pokemon_index: i,
            level: Math.floor(Math.random() * battlePokemons[0].getLevel()+3) + 1,
            exp: 0,
            image: pokemon.front_image
        }));
        const move1id = pokemon.move1_id;
        const move2id = pokemon.move2_id;
        const move1 = await move_getter(Number(move1id));
        const move2 = await move_getter(Number(move2id));
        moves.push(move1);
        moves.push(move2);
    }
    return {
        battlePokemons,
        wildPokemons,
        moves
    }
}