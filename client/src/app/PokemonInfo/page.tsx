"use client"

import React from 'react'
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import { useTeamPokemonContext } from '../../../contexts/teamContext';
import PokemonInfo from './PokemonInfo';
import Link from 'next/link';
import { useMoveContext } from '../../../contexts/moveContext';

export default function Home() {
    const { pokemons } = useTeamPokemonContext();
    const { moves } = useMoveContext();

    const idToName = (id:number):string =>{
        for(let i = 0; i < moves.length; i++){
            if(moves[i].move_id === id)return moves[i].name;  
        }
        return "";
    }

    const idToDescription = (id:number):string =>{
        for(let i = 0; i < moves.length; i++){
            if(moves[i].move_id === id)return moves[i].description;  
        }
        return "";
    }

    const idToType = (id:number):string =>{
        for(let i = 0; i < moves.length; i++){
            if(moves[i].move_id === id)return moves[i].type;  
        }
        return "";
    }
    console.log(moves);
    return (
    <div>
        <Link　className='text-1000' href={"/"}>もどる</Link>
        <Header></Header>
        <div className='h-[95vh] bg-cyan-50'>
            {
                pokemons.map((pokemon) => 
                <PokemonInfo 
                    key={pokemon.pokemon_id}
                    name={pokemon.name} 
                    front_image={pokemon.front_image} 
                    type={pokemon.type} 
                    level={pokemon.level}
                    move1_name={idToName(pokemon.move1_id)}
                    move2_name={idToName(pokemon.move2_id)}
                    move1_description={idToDescription(pokemon.move1_id)}
                    move2_description={idToDescription(pokemon.move2_id)}
                    move1_type={idToType(pokemon.move1_id)}
                    move2_type={idToType(pokemon.move2_id)}    
                />)
            }
        </div>   
        <Footer></Footer>
    </div>
    )
}
