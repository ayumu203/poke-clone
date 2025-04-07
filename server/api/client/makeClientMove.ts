import { Move } from "../../types/move.type";
import { Pokemon } from "../../types/pokemon.types";
import { Team_pokemon } from "../../types/team_pokemon.type";
import { move_getter } from "../move/move";
import { pokemon_getter } from "../pokemon/pokemon";
import { team_pokemon_getter } from "../teamPokemon/teamPokemonHandler";

const makeClientMove = async(teamPokemon:Team_pokemon,pokemon:Pokemon,move1:Move,move2:Move) =>{
    const data = [
        {
            move_id:move1?.move_id,
            name:move1?.name,
            type:move1?.type,
            description:move1?.description
        },
        {
            move_id:move2?.move_id,
            name:move2?.name,
            type:move2?.type,
            description:move2?.description
        },
    ]
    return data;
}

export const handle_make_client_move = async(player_id:string,count:number) => {
const m = [];
for(let i = 0; i < count; i++){
    const teamPokemon:Team_pokemon = await team_pokemon_getter(player_id,1);
    const pokemon:Pokemon = await pokemon_getter(Number(teamPokemon?.pokemon_id));
    const move1:Move = await move_getter(Number(pokemon?.move1_id));    
    const move2:Move = await move_getter(Number(pokemon?.move2_id));    
    const tmp = await makeClientMove(teamPokemon,pokemon,move1,move2);
    await m.push(tmp);
}
return m;
}
