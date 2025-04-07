import { PrismaClient } from "@prisma/client";
import { Player } from "../../types/player.type";

const prisma = new PrismaClient();

export async function player_getter(player_id:string):Promise<Player> {
    const data = await prisma.player.findFirst({where: {player_id} });
    if(!data)return data;
    const player:Player = {
        player_id:player_id,
        name:data.name
    };
    return player;
}

export async function player_exist(player_id:string):Promise<Boolean> {
    const data = await prisma.player.findFirst({where: {player_id} });
    if(!data){
        return false;
    }
    return true;
}

export async function player_register(player_id:string,name:string) {
    const exist:Boolean|Player = await player_exist(player_id);
    if(!exist){
        await prisma.player.create({data: {
            player_id:player_id,
            name:name
        }})
    }
    const result = await prisma.player.findMany();
    console.log(JSON.stringify(result,null,2));    
}