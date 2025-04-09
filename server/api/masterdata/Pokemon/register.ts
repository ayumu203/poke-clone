import {PrismaClient} from "@prisma/client";
import { Pokemon } from "../../../types/pokemon.types";
import { fetchPokemonInfo } from "./fetchData";

const prisma = new PrismaClient()

// イッシュ地方のポケモンのデータをAPIで取得し,データベースに保存する
async function store_pokemon_info_from_api(){
    // pokemon_infoのすべてのレコードを削除する
    const del = await prisma.pokemon.deleteMany();

    // イッシュ地方の図鑑番号が最初のポケモンビクティニよりデータ回収スタート
    let begin = 494;
    // 図鑑番号最後のゲノセクトで終了
    let end = 649;
    for(let i = begin; i <= end; i++){
      const pokemon:Pokemon = await fetchPokemonInfo(i);
      let is_evolve = 0;
      if(pokemon){
        if(pokemon.is_evolve)is_evolve = 1;
        await prisma.pokemon.create({data:{
          pokemon_id:pokemon.pokemon_id,
          name:pokemon.name,
          type:pokemon.type,
          front_image:pokemon.front_image,
          back_image:pokemon.back_image,
          base_hp:pokemon.base_hp,
          base_attack:pokemon.base_attack,
          base_defence:pokemon.base_defence,
          base_special_attack:pokemon.base_special_attack,
          base_special_defence:pokemon.base_special_defence,
          base_speed:pokemon.base_speed,
          move1_id:pokemon.move1_id,
          move2_id:pokemon.move2_id,
          is_evolve:Boolean(is_evolve)
        }}); 
      }
    }

    const allPokemon = await prisma.pokemon.findMany({
      orderBy:{ pokemon_id:'asc' }
    });
  
    console.log(JSON.stringify(allPokemon,null,2)); 
}

// サーバでしか動かさないためメイン関数を用意
async function main() {
  try {
    store_pokemon_info_from_api();
  } catch(err){
    console.error(err);
  }
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
})