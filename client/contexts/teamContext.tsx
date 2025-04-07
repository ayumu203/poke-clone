"use client"

import React, { createContext, useContext, useState } from "react";
import { Pokemon } from "../types/Pokemon";

type TeamPokemonContextType = {
    pokemons:Pokemon[],
    addPokemon:(pokemon:Pokemon) => void;
    removePokemon:(index:number) => void;
};

const TeamPokemonContext = createContext<TeamPokemonContextType>({
    pokemons:[],
    addPokemon:() => {},
    removePokemon:() => {},
});

export const TeamPokemonProvider = ({children}:{children:React.ReactNode}) => {
    const [pokemons,setPokemons] = useState<Pokemon[]>([]);

    const addPokemon = (pokemon:Pokemon) => {
        setPokemons(prev => [...prev,pokemon]);
    };

    const removePokemon = (index:number) => {
        setPokemons(prev => prev.filter((_,i) => i !== index))
    }

    return(
        <TeamPokemonContext.Provider value={{pokemons,addPokemon, removePokemon }}>
            {children}
        </TeamPokemonContext.Provider>
    )
};

export const useTeamPokemonContext = () => useContext(TeamPokemonContext);