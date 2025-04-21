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
                for(let j = 0; j < team_pokemon.move_list.length; j++){
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
            level: Math.floor(Math.random() * battlePokemons[0].getLevel()+3) + 1,
            exp: 0,
            image: pokemon.front_image,
        }));
        for(let j = 0; j < MAX_MOVE_COUNT; j++){
            const move_id = pokemon.move_list[j];
            const move = await move_getter(Number(move_id));
            if(!move)continue;
            moves.push(move);
        }
    };
    console.log("wildPokemons",wildPokemons);
    return {
        battlePokemons,
        wildPokemons,
        moves,
        endFlag: false,
        message: [],
    }
}


// export const TestInitGameData = async () => {
//     // 地面来たら詰むチュウ
//     const pikachu = new BattlePokemon({
//         pokemon: {
//             pokemon_id: 1,
//             name: "ピカチュウ",
//             type: "electric",
//             front_image: "https://pokeapi.co/media/sprites/pokemon/other/official-artwork/4.png",
//             back_image: "https://pokeapi.co/media/sprites/pokemon/other/official-artwork/4.png",
//             base_hp: 35,
//             base_attack: 55,
//             base_defence: 40,
//             base_special_attack: 50,
//             base_special_defence: 50,
//             base_speed: 90,
//             evolve_level: 16,
//             move_list: [202,196,276,105]
//         },
//         level: 5,
//         pokemon_index: 0,
//         exp: 0,
//         image: "https://pokeapi.co/media/sprites/pokemon/other/official-artwork/4.png",
//     });



//     const battlePokemons = [pikachu];
//     const moves = [];

//     for(let i=0; i < battlePokemons.length; i++){
//         const pokemon = battlePokemons[i];
//         for(let j = 0; j < pokemon.getMoveList().length; j++){
//             const move_id = pokemon.getMoveList()[j];
//             const move = await move_getter(Number(move_id));
//             moves.push(move);
//             if(!move)continue;
//         }
//     }

//     // 野生ポケモンの出現数
//     const begin = POKEMON_ID_BEGIN;
//     const end = POKEMON_ID_END;
//     const wildPokemons = [];
//     for(let i = 0; i < wild_pokemon_count; i++){
//         const pokemon = new BattlePokemon({
//             pokemon: {
//                 pokemon_id: 2,
//                 name: "ゴリチュウ",
//                 type: "normal",
//                 front_image: "https://pokeapi.co/media/sprites/pokemon/other/official-artwork/4.png",
//                 back_image: "https://pokeapi.co/media/sprites/pokemon/other/official-artwork/4.png",
//                 base_hp: 35,            
//                 base_attack: 55,
//                 base_defence: 40,
//                 base_special_attack: 50,
//                 base_special_defence: 50,
//                 base_speed: 90,
//                 evolve_level: 16,
//                 move_list: [534,536,426,529]
//             },
//             level: 5,
//             pokemon_index: 0,
//             exp: 0,
//             image: "https://pokeapi.co/media/sprites/pokemon/other/official-artwork/4.png",
//         });
//         wildPokemons.push(pokemon);
    
//         if(!pokemon)continue;
//         for(let j = 0; j < pokemon.getMoveList().length; j++){
//             const move_id = pokemon.getMoveList()[j];
//             const move = await move_getter(Number(move_id));
//             if(!move)continue;
//             moves.push(move);
//         }
//     }

    
//     return {
//         battlePokemons,
//         wildPokemons,
//         moves,
//     }
// }