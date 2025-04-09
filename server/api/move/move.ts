import { PrismaClient } from "@prisma/client";
import { Move } from "../../types/move.type";

const prisma = new PrismaClient();

export async function move_getter(move_id:number):Promise<Move> {
    const data:Move = await prisma.move.findFirst({where: {move_id} });
    if(!data)return data;
    return data;
}