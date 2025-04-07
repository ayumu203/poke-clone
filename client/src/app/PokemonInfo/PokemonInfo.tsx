import Image from 'next/image'
import React from 'react'

const pokemon = {
        front_image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/494.gif",
        name: "ビクティニ",
        type: "psychic",
        level:1,
        hp: 100,
        move1_name: "ひのこ",
        move2_name: "たいあたり",
        description: "力を　こめた　パンチで\n相手を　攻撃する。\n"
}

export default function PokemonInfo() {
  return (
    <div className='flex justify-evenly items-center text-cyan-800'>
        <Image src={pokemon.front_image} alt={pokemon.name} width={100} height={100}></Image>
        <div>
            <p>レベル{pokemon.level}</p>
            <p>{pokemon.name}</p>
        </div>
        <div>
            <p>{pokemon.move1_name}:{pokemon.description}</p>
            <p>{pokemon.move2_name}:{pokemon.description}</p>
        </div>
    </div>
  )
}
