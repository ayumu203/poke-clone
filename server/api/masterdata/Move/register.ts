import { PrismaClient } from "@prisma/client";
import { Move } from "../../../types/move.type";
import { fetchMoveInfo } from "./fetchData";

const prisma = new PrismaClient();

// イッシュ地方のポケモンのデータをAPIで取得し,データベースに保存する
async function store_move_info_from_api(){
    // pokemon_infoのすべてのレコードを削除する
    const del = await prisma.move.deleteMany();

    for(let i = 1; i <= 559; i++){
      const move:Move = await fetchMoveInfo(i);
      if(move){
        let power = 0;
        let accuracy = 0;
        if(move.power !== null)power = move.power;
        if(move.accuracy !== null)accuracy = move.accuracy;
        await prisma.move.create({data:{
            move_id:move.move_id,
            move_category:move.move_category,
            name:move.name,
            type:move.type,
            damage_class: move.damage_class,
            power:power,
            pp:move.pp/2,
            accuracy:accuracy,
            priority:move.priority,
            status_name:move.status_name,
            status_rank:move.status_rank,
            status_target:move.status_target,
            status_chance:move.status_chance,
            ailment_name:move.ailment_name,
            ailment_chance:move.ailment_chance,
            healing_amount:move.healing_amount,
            drain_power:move.drain_power,
            description:move.description,
        }})
      }
    }

    const allPokemon = await prisma.move.findMany({
        orderBy:{ move_id:'asc' }
      });
    
    // console.log(JSON.stringify(allPokemon,null,2)); 
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