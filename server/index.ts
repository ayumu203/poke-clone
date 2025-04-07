import express from 'express';
import bodyParser from 'body-parser';
import type { Express, Request, Response } from 'express';
import { player_exist, player_getter, player_register } from './api/playerdata/dataHandler';
import { team_pokemon_exist, team_pokemon_getter, team_pokemon_register } from './api/teamPokemon/teamPokemonHandler';
import { fetch_pokemon } from './api/pokemon/pokemon';
import { Player } from './types/player.type';
import { Pokemon } from './types/pokemon.types';
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

// ログイン処理ユーザ認証・戦闘ポケモンの確認まで
app.post("/data/player", async(req:Request,res:Response) =>{
  try {
    const player_id = req.body.id;
    // ユーザのデータが存在する場合はユーザデータを取得、存在しない場合はユーザデータを登録
    let result:Boolean = await player_exist(player_id);
    if(!result){
      await player_register(player_id,"トレーナー君");
    }
    const player:Player|null = await player_getter(player_id);
    
    // パーティ戦闘のポケモンが存在する場合はexist、存在しない場合はnoneを返す.
    const exist = await team_pokemon_exist(player_id,1);
    if(!exist){
      res.status(200).send({player:player,first_pokemon:"none"});
    }
    else res.status(200).send({player:player,first_pokemon:"exist"});
  } catch(error){
    throw error;
  }
});

// 最初のポケモンの選択肢を表示
app.post("/first-pokemon-option",async(req:Request,res:Response) =>{
  const data = require('./data/firstPokemonOption.json');
  res.status(200).json(data)
});

// 最初のポケモンを選択
app.post("/first-pokemon-determination",async(req:Request,res:Response)=>{
  const player_id:string = req.body.player_id;
  const pokemon_id:number = Number(req.body.pokemon_id);
  await team_pokemon_register(player_id,pokemon_id,Number(1));
  const pokemon = await team_pokemon_getter(player_id,1);
  res.status(200).send(pokemon);
});

// ポケモンデータ参照
app.post("/data/pokemon",async(req:Request,res:Response)=>{
  const pokemon_id = Number(req.body.id);
  const pokemon:Pokemon|null = await fetch_pokemon(pokemon_id);
  if(!pokemon)res.status(200).send(null);
  res.status(200).send(pokemon);
})

// サーバ君
app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error:Error) => {
  throw new Error(error.message);
})