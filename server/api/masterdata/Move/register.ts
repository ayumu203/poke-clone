import { PrismaClient } from "@prisma/client";
import { Move } from "../../../types/move.type";
import { fetchMoveInfo } from "./fetchData";

const prisma = new PrismaClient();

// イッシュ地方のポケモンのデータをAPIで取得し,データベースに保存する
async function store_move_info_from_api(){
    // pokemon_infoのすべてのレコードを削除する
    const del = await prisma.move.deleteMany();

    for(let i = 1; i <= 500; i++){
      const move:Move = await fetchMoveInfo(i);
      if(move){
        let power = 0;
        let accuracy = 0;
        if(move.power !== null)power = move.power;
        if(move.accuracy !== null)accuracy = move.accuracy;
        await prisma.move.create({data:{
            move_id:move.move_id,
            name:move.name,
            type:move.type,
            description:move.description,
            pp:move.pp,
            power:power,
            accuracy:accuracy,
            priority:move.priority,
            status_effect:move.status_effect,
            status_name:move.status_name,
            status_rank:move.status_rank,
            status_target:move.status_target,
            ailment_effect:move.ailment_effect,
            ailment_name:move.ailment_name,
            ailment_chance:move.ailment_chance,
            healing_effect:move.healing_effect,
            healing_amount:move.healing_amount
        }})
      }
    }

    const allPokemon = await prisma.move.findMany({
        orderBy:{ move_id:'asc' }
      });
    
    console.log(JSON.stringify(allPokemon,null,2)); 
}

// サーバでしか動かさないためメイン関数を用意
async function main() {
  try {
    store_move_info_from_api();
  } catch(err){
    console.error(err);
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect()
})