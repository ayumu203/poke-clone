import React from 'react'
import { BattlePokemon } from '../../../types/battlePokemon.type'
import Image from 'next/image'
import { typeToColor } from '../../../libs/displayTool/typeTocolor'

export default function BattlePokemonComponent({ battlePokemon }: { battlePokemon: BattlePokemon }) {
  return (
    <>
        <div>
            <div className='flex justify-center items-center flex-col'>
                <div
                    className='text-1.5xl font-bold mb-2'
                    style={{
                        color: 'white'
                    }}>
                    Lv.{battlePokemon.level}:{battlePokemon.name}
                </div>
                <progress 
                value={battlePokemon.current_hp/battlePokemon.max_hp} 
                className='w-9/10 h-2 bg-gray-200 rounded-full mb-2'
                />
                <Image src={battlePokemon.image} width={100} height={100} alt="pokeon" className='z-1'/>
            </div>
        </div>
    </>
  )
}
