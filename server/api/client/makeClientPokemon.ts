import { Move } from "../../types/move.type";
import { Pokemon } from "../../types/pokemon.types";
import { Team_pokemon } from "../../types/team_pokemon.type";
import { move_getter } from "../move/move";
import { pokemon_getter } from "../pokemon/pokemon";
import { team_pokemon_getter } from "../teamPokemon/teamPokemonHandler";

const makeClientPokemon = async(teamPokemon:Team_pokemon,pokemon:Pokemon,move1:Move,move2:Move) =>{
    const data = {
    pokemon_id:pokemon?.pokemon_id,
    index:teamPokemon?.pokemon_index,
    name:pokemon?.name,
    type:pokemon?.type,
    front_image:pokemon?.front_image,
    back_image:pokemon?.back_image,
    base_hp:pokemon?.base_hp,
    base_attack:pokemon?.base_attack,
    base_defence:pokemon?.base_defence,
    base_special_attack:pokemon?.base_special_attack,
    base_special_defence:pokemon?.base_special_defence,
    base_speed:pokemon?.base_speed,
    move1_id:pokemon?.move1_id,
    move2_id:pokemon?.move2_id,
    is_evolve:pokemon?.is_evolve
    }
    return data;
}

export const handle_make_clientPokemon = async(player_id:string,count:number) => {
const p = [];
for(let i = 0; i < count; i++){
    const teamPokemon:Team_pokemon = await team_pokemon_getter(player_id,1);
    const pokemon:Pokemon = await pokemon_getter(Number(teamPokemon?.pokemon_id));
    const move1:Move = await move_getter(Number(pokemon?.move1_id));    
    const move2:Move = await move_getter(Number(pokemon?.move2_id));    
    const tmp = await makeClientPokemon(teamPokemon,pokemon,move1,move2);
    await p.push(tmp);
}
return p;
}
