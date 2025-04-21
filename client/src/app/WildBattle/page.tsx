"use client"

import React, { useEffect, useState } from 'react'
import { usePlayer } from '../../../contexts/playerContext'
import { fetch_initialized_game_data } from '../../../libs/battle/fetchInicializedGameData';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import BattlePokemonComponent from './BattlePokemon';
import { useTeamPokemonContext } from '../../../contexts/teamContext';
import { useRouter } from 'next/navigation';
import { BattlePokemon } from '../../../types/battlePokemon.type';
import { idToName } from '../../../libs/displayTool/moveIdToMoveName';
import { send_game_action } from '../../../libs/battle/sendGameAction';
import { Move } from '../../../types/Move';
import { Action } from '../../../types/action.type';

export default function Page() {
    const router = useRouter();
    const { player } = usePlayer();
    const { pokemons } = useTeamPokemonContext();

    const [ start,setStart ] = useState<boolean>(false);


    const [ data,setData ] = useState<any>(null);
    const [ command,setCommand ] = useState<string>("");
    const [ turn,setTurn ] = useState<number>(0);
    const [ index,setIndex ] = useState<number>(0);
 
    const [ battlePokemon,setBattlePokemon ] = useState<BattlePokemon | null>(null);
    const [ wildPokemon,setWildPokemon ] = useState<BattlePokemon | null>(null);
    const [ battlePokemons,setBattlePokemons ] = useState<BattlePokemon[]>([]);
    const [ wildPokemons,setWildPokemons ] = useState<BattlePokemon[]>([]);
    const [ moves,setMoves ] = useState<Move[]>([]);

      useEffect(() => {
        if (!player || !pokemons || pokemons.length === 0) {
          router.push("/Login");
        }
      }, [player, pokemons, router]);



    useEffect(()=>{
        if(player !== null){
            const handleGameData = async () => {
                try {
                    const data = await fetch_initialized_game_data(player.id);
                    setData(data);
                    setBattlePokemons(data.battlePokemons);
                    setBattlePokemon(data.battlePokemons[0]);
                    setWildPokemons(data.wildPokemons);
                    setWildPokemon(data.wildPokemons[0]);
                    setMoves(data.moves);
                    console.log(data);
                }
                catch (error) {
                    console.error("バトルの初期化データ取得でエラー", error);
                }
            }
            handleGameData();
        }
    },[start]);

    useEffect(()=>{
        // フラグが変化した場合の戦闘の処理を記述する
        const handleGameDate = async () => {
            let id = 1;
            switch(command){
                case "fight":
                    id = 1;
                    break;
                case "run":
                    id = 2;
                    router.push("/");
                    break;
            }
            const action:Action = {
                action_id: id,
                command_id: index,
            }
            const data = await send_game_action(battlePokemons,wildPokemons,moves,action);
            console.log(data);
        }
        if(data){
            handleGameDate();
            setCommand("");
        }
    },[turn]);
  return (
    <div>
        <Header />
        <main className="flex justify-center h-192 bg-[url(/003_wildBattle.png)] z-999">
        {!start && <button className='text-5xl text-white' onClick={()=>{setStart(true)}}>ゲーム開始</button> }
        {start && command === "" &&
            <div className='flex justify-left items-center flex-col'>
                <button className='mt-10 text-3xl text-white' onClick={()=>{setCommand("fight")}}>
                    たたかう
                </button>
                <button className='mt-10 text-3xl text-white' onClick={()=>{setCommand("run");setTurn(prevTurn => prevTurn + 1)}}>
                    にげる
                </button>
        </div>
        }
        {start && battlePokemon && command === "fight" &&
            <div className='flex justify-left items-center flex-col'>
                {
                    battlePokemon!.move_list.map((moveId:number,mIndex:number) => {
                        return <button key={moveId} onClick={()=>{
                            // ここに戦闘の処理を記述するのではなく,フラグを立てるのみにする
                            setTurn(prevTurn => prevTurn + 1);
                            setIndex(mIndex);
                        }} 
                        className='mt-10 text-3xl text-white'>{idToName(moveId,moves)}</button>
                    })
                }
            </div>
        }
        {start && data && battlePokemon && 
        <div className='w-50 h-50 absolute top-3/5 left-1/6' >
            <BattlePokemonComponent 
            battlePokemon={battlePokemon}/>
        </div>
        }
        {start && data && wildPokemon &&
        <div className='w-50 h-50 absolute top-2/5 left-4/6' >
            <BattlePokemonComponent 
            battlePokemon={wildPokemon}/>
        </div>
        }
        </main>
        <Footer />
    </div>
  )
}
