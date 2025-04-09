"use client"

import React, { createContext, useContext, useState } from "react";
import { Move } from "../types/Move";

type MoveContextType = {
    moves:Move[],
    addMove:(move:Move) => void;
    clearMoves: () => void;
};

const MoveContext = createContext<MoveContextType>({
    moves:[],
    addMove:() => {},
    clearMoves:() => {},
});

export const MoveProvider = ({children}:{children:React.ReactNode}) => {
    const [moves,setMoves] = useState<Move[]>([]);

    const addMove = (move:Move) => {
        setMoves(prev => [...prev,move]);
    };

    const clearMoves = () => {
        setMoves([]);
    }

    return(
        <MoveContext.Provider value={{ moves, addMove, clearMoves }}>
            {children}
        </MoveContext.Provider>
    )
};

export const useMoveContext = () => useContext(MoveContext);