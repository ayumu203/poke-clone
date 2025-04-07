import { PrismaClient } from "@prisma/client";
import { Pokemon } from "../../types/pokemon.types";

const prisma = new PrismaClient();

export async function fetch_pokemon(pokemon_id:number):Promise<Pokemon | null> {
    const data = await prisma.pokemon.findFirst({ where: {pokemon_id} });
    if(data){
        const pokemon:Pokemon = {
            pokemon_id:pokemon_id,
            name:data.name,
            type:data.type,
            front_image:data.front_image,
            back_image:data.back_image,
            base_hp:data.base_hp,
            base_attack:data.base_attack,
            base_defence:data.base_defence,
            base_special_attack:data.base_special_attack,
            base_special_defence:data.base_special_defence,
            base_speed:data.base_speed,
            move1_id:data.move1_id,
            move2_id:data.move2_id,
            is_evolve:data.is_evolve
        }
        return pokemon;
    }
    return null;
}
