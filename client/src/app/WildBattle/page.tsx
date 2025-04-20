"use client"

import React, { useEffect, useState } from 'react'
import { usePlayer } from '../../../contexts/playerContext'
import { fetch_initialized_game_data } from '../../../libs/fetchInicializedGameData';

export default function Page() {
    const { player } = usePlayer();
    const [ start,setStart ] = useState<boolean>(false);
    const [ data,setData ] = useState<any>(null);

    useEffect(()=>{
        if(player !== null){
            const getData = async () => {
                try {
                    const data = await fetch_initialized_game_data(player.id);
                    setData(data);
                    console.log(data);
                }
                catch (error) {
                    console.error("バトルの初期化データ取得でエラー", error);
                }
            }
            getData();
        }
    },[start]);
  return (
    <div>
        {!start && <button onClick={()=>{setStart(true)}}>ゲーム開始</button> }
    </div>
  )
}
