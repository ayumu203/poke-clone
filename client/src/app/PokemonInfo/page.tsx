"use client"

import React from 'react'
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import { useTeamPokemonContext } from '../../../contexts/teamContext';
import PokemonInfo from './PokemonInfo';

export default function Home() {
    const { pokemons } = useTeamPokemonContext();

    return (
    <div>
        <Header></Header>
        <div className='h-[95vh] bg-cyan-50'>
            <PokemonInfo></PokemonInfo>
        </div>   
        <Footer></Footer>
    </div>
    )
}
