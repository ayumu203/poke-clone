import { PrismaClient } from "@prisma/client";
import { Team_pokemon } from "../../types/team_pokemon.type";
import { MAX_MOVE_COUNT } from "../../const/max_move_count.const";

const prisma = new PrismaClient();

// n番目のポケモンを取得
export async function team_pokemon_getter(player_id:string,index:number):Promise<Team_pokemon> {
    const data = await prisma.team_pokemon.findUnique({where: {
        pokemon_identifier:{
            player_id:player_id,
            pokemon_index:index
        }}  
    });
    console.log(data);
    if(!data)return null;
    const pokemon:Team_pokemon = {
        player_id:player_id,
        pokemon_index:index,
        pokemon_id:data.pokemon_id,
        level:Number(data.level),
        exp:Number(data.exp),
        move_list:data.move_list,
    }
    return pokemon;
}

// n番目のポケモンが存在するかを確認
export async function team_pokemon_exist(player_id:string,index:number):Promise<Boolean> {
    const pokemon = await prisma.team_pokemon.findUnique({where: {
        pokemon_identifier:{
            player_id:player_id,
            pokemon_index:index
        }}  
    });
    if(!pokemon){
        return false;
    }
    return true;
}

// n番目に指定図鑑番号のポケモンを登録
export async function team_pokemon_register(player_id:string,pokemon_id:number,index:number) {
    const exist:Boolean = await team_pokemon_exist(player_id,index);
    const pokemon = await prisma.pokemon.findFirst({where: {
        pokemon_id:pokemon_id,
    }});
    if(!exist){
        const move_list_cp:number[] = pokemon!.move_list;
        const move_list:number[] = [];
        if(move_list_cp){
            for(let i = 0; i < MAX_MOVE_COUNT; i++){
                move_list.push(move_list_cp[i]);
            }
        }
        console.log(move_list);
        await prisma.team_pokemon.create({data: {
            player_id:player_id,
            pokemon_index:index,
            pokemon_id:pokemon_id,
            level:5,
            exp:0,
            move_list:move_list,
        }})
    }
}