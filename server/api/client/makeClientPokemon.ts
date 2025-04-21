import { Move } from "../../types/move.type";
import { Pokemon } from "../../types/pokemon.types";
import { Team_pokemon } from "../../types/team_pokemon.type";
import { move_getter } from "../move/move";
import { pokemon_getter } from "../pokemon/pokemon";
import { team_pokemon_getter } from "../teamPokemon/teamPokemonHandler";

const makeClientPokemon = async(teamPokemon:Team_pokemon,pokemon:Pokemon) =>{
    const data = {
    pokemon_id:pokemon?.pokemon_id,
    index:teamPokemon?.pokemon_index,
    name:pokemon?.name,
    type:pokemon?.type,
    level:teamPokemon?.level,
    front_image:pokemon?.front_image,
    back_image:pokemon?.back_image,
    base_hp:pokemon?.base_hp,
    base_attack:pokemon?.base_attack,
    base_defence:pokemon?.base_defence,
    base_special_attack:pokemon?.base_special_attack,
    base_special_defence:pokemon?.base_special_defence,
    base_speed:pokemon?.base_speed,
    exp:teamPokemon?.exp,
    evolve_level:pokemon?.evolve_level,
    move_list:teamPokemon?.move_list,
    }
    return data;
}

export const handle_make_client_pokemon = async(player_id:string,count:number) => {
const p = [];
for(let i = 0; i < count; i++){
    const teamPokemon:Team_pokemon = await team_pokemon_getter(player_id,i+1);
    const pokemon:Pokemon = await pokemon_getter(Number(teamPokemon?.pokemon_id));
    const clientPokemon = await makeClientPokemon(teamPokemon,pokemon);
    await p.push(clientPokemon);
}
return p;
}
