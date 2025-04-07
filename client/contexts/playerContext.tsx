"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Player } from "../types/Player";
import { useUser } from "./userContext";
import { fetch_player } from "../libs/fetchPlayer";

type PlayerContextType = { player:Player | null };
const PlayerContext = createContext<PlayerContextType>({player:null});
export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({children}:{children:ReactNode}) =>{
    const { user } = useUser();
    const [ player,setPlayer ] = useState<Player | null>(null);

    useEffect(()=>{
        const fetchPlayer = async() => {
            if(user){
                const data = await fetch_player(user.id);
                setPlayer({id:data.player.player_id,name:data.player.name})
            }
        };
        fetchPlayer();
    },[user]);

    return (
        <PlayerContext.Provider value={{player}}>
            {children}
        </PlayerContext.Provider>
    )
}