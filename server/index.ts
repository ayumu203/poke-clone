import express from 'express';
import bodyParser from 'body-parser';
import type { Request, Response } from 'express';
import { player_exist, player_getter, player_register } from './api/playerdata/playerHandler';
import { team_pokemon_exist, team_pokemon_getter, team_pokemon_register } from './api/teamPokemon/teamPokemonHandler';
import { pokemon_getter } from './api/pokemon/pokemon';
import { Player } from './types/player.type';
import { Pokemon } from './types/pokemon.types';
import { move_getter } from './api/move/move';
import { Move } from './types/move.type';
import { handle_make_client_pokemon } from './api/client/makeClientPokemon';
import { ClientMove } from './types/clientMove.type';
import { Team_pokemon } from './types/team_pokemon.type';
const cors = require('cors');
const app = express();

const PORT = 3001;

// ミドルウェアの設定
app.use(express.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(cors());

//ルート
app.get("/", async(request:Request, response:Response) => { 
  response.status(200).send("This is the end point"); 
}); 

// ログイン処理後プレイヤーデータをデータベース所に作成する
// ポケモンを所持しているかどうかをexist・noneで返す
app.post("/data/player", async(req:Request,res:Response) =>{
  try {
    const player_id:string = req.body.id;
    // ユーザのデータが存在する場合はユーザデータを取得、存在しない場合はユーザデータを登録
    let result:Boolean = await player_exist(player_id);
    if(!result){
      await player_register(player_id,"トレーナー君");
    }
    const player:Player = await player_getter(player_id);
    
    // ポケモンを所持している場合はexist、存在しない場合はnoneを返す.
    const exist = await team_pokemon_exist(player_id,1);
    if(!exist){
      res.status(200).send({player:player,first_pokemon:"none"});
    }
    else res.status(200).send({player:player,first_pokemon:"exist"});
  } catch(error){
    console.error(error);
    res.status(204).send("データを取得できませんでした.");
    throw error;
  }
});

// // ログイン後所持しているポケモンがいる場合は、クライアントサイドのPokemon型に対応したデータを渡す
app.post("/data/team-pokemon",async(req:Request,res:Response) => {
  const player_id:string = req.body.id;
  try{
    const flag1:Boolean = await team_pokemon_exist(player_id,1);
    const flag2:Boolean = await team_pokemon_exist(player_id,2);
    const flag3:Boolean = await team_pokemon_exist(player_id,3);
    
    // ポケモンが何匹か
    let pokemon_count = 0;
    if(flag1)pokemon_count++;
    if(flag2)pokemon_count++;
    if(flag3)pokemon_count++;
    const data = await handle_make_client_pokemon(player_id,pokemon_count);
    res.status(200).send(data);
  } catch(error){
    console.error(error);
    res.status(204).send("データを取得できませんでした.");
    throw error;
  }
});

// ログイン後所持しているポケモンがいる場合は、クライアントサイドのMove型に対応した必要な技データを渡す
app.post("/data/team-move",async(req:Request,res:Response) => {
  const player_id:string = req.body.id;
  try{
    const flag1:Boolean = await team_pokemon_exist(player_id,1);
    const flag2:Boolean = await team_pokemon_exist(player_id,2);
    const flag3:Boolean = await team_pokemon_exist(player_id,3);
    
    // ポケモンが何匹か
    let pokemon_count = 0;
    if(flag1)pokemon_count++;
    if(flag2)pokemon_count++;
    if(flag3)pokemon_count++;

    const data:ClientMove[] = [];

    for(let i = 1; i <= pokemon_count; i++){
      const team_pokemon:Team_pokemon = await team_pokemon_getter(player_id,i);
      const move_list = team_pokemon?.move_list;
      console.log(move_list);
      if(move_list){
        for(let j = 0; j < move_list.length; j++){
          const move:Move = await move_getter(move_list[j]);
          if(move){
            const client_move:ClientMove = {
              move_id:move.move_id,
              name:move.name,
              type:move.type, 
              description:move.description
            }
            data.push(client_move);
          }
        }
      }
    }
    res.status(200).send(data);
  } catch(error){
    console.error(error);
    res.status(204).send("データを取得できませんでした.");
    throw error;
  }
});



// // 最初に選べる3匹のポケモンのデータを返す
app.post("/first-pokemon/option",async(req:Request,res:Response) =>{
  try {
    const data = require('./data/firstPokemonOption.json');
    res.status(200).json(data);
  } catch(error){
    console.error(error);
    res.status(204).send("データを取得できませんでした.")
    throw error;
  }
});

// 最初のポケモンを登録後、そのポケモンの技データを返す
app.post("/first-pokemon/register",async(req:Request,res:Response)=>{
  try {
    const exist = await team_pokemon_exist(req.body.player_id,1);
    if(exist){
      res.status(200).send("ポケモンはすでに登録されています.");
      return;
    }
    const player_id:string = req.body.player_id;
    const pokemon_id:number = Number(req.body.pokemon_id);
    // 初期の3体以外は選択できない
    if(!((pokemon_id === 494) || (pokemon_id === 495) || (pokemon_id === 501))){
      res.status(200).send("ポケモンのIDが不正です.");
      return;
    }
    // ユーザの手持ちにデータを追加
    const result = await team_pokemon_register(player_id,pokemon_id,Number(1));
    const data = await handle_make_client_pokemon(player_id,1);
    if(data)res.status(200).send(data);
    res.status(200).send("データが存在しません.")
  } catch(error){
    console.error(error);
    res.status(204).send("データを取得できませんでした.");
    throw error;
  }
});

// Pokemonテーブルのデータ参照
app.post("/data/pokemon",async(req:Request,res:Response)=>{
  try {
    const pokemon_id = Number(req.body.id);
    const pokemon:Pokemon = await pokemon_getter(pokemon_id);
    if(!pokemon)res.status(200).send(null);
    res.status(200).send(pokemon);
  } catch(error){
      console.error(error);
      res.status(200).send("データを取得できませんでした.");
      throw error;
  }
})

// // サーバ君
app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error:Error) => {
  throw new Error(error.message);
})