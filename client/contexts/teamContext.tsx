"use client"

import React, { createContext, useContext, useState } from "react";
import { Pokemon } from "../types/Pokemon";

type TeamPokemonContextType = {
    pokemons:Pokemon[],
    addPokemon:(pokemon:Pokemon) => void;
    removePokemon:(index:number) => void;
    clearPokemons:() => void;
};

const TeamPokemonContext = createContext<TeamPokemonContextType>({
    pokemons:[],
    addPokemon:() => {},
    removePokemon:() => {},
    clearPokemons:()=> {},
});

export const TeamPokemonProvider = ({children}:{children:React.ReactNode}) => {
    const [pokemons,setPokemons] = useState<Pokemon[]>([]);

    const addPokemon = (pokemonToAdd:Pokemon) => {
        setPokemons(currentPokemons => {
            const pokemonExist = currentPokemons.some(
                pokemon => pokemon.pokemon_id === pokemonToAdd.pokemon_id
            );
            if(!pokemonExist)return [...currentPokemons,pokemonToAdd];
            else return currentPokemons;
        })
    };

    const removePokemon = (index:number) => {
        setPokemons(prev => prev.filter((_,i) => i !== index))
    }
    const clearPokemons = () =>{
        setPokemons([]);
    }

    return(
        <TeamPokemonContext.Provider value={{pokemons,addPokemon, removePokemon, clearPokemons }}>
            {children}
        </TeamPokemonContext.Provider>
    )
};

export const useTeamPokemonContext = () => useContext(TeamPokemonContext);