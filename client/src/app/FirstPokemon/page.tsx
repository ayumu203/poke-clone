"use client"

import { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import { useUser } from '../../../contexts/userContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTeamPokemonContext } from '../../../contexts/teamContext';
import { fetch_player } from '../../../libs/fetchPlayer';
import { fetch_first_option } from '../../../libs/fetchFirstPokemon';
import { Pokemon } from '../../../types/Pokemon';
import { send_first_pokemon } from '../../../libs/sendFirstPokemon';
import { Move } from '../../../types/Move';
import { useMoveContext } from '../../../contexts/moveContext';
import { fetch_team_pokemon } from '../../../libs/fetchTeamPokemons';
import { fetch_team_move } from '../../../libs/fetchTeamMove';


export default function Home() {
    const { user } = useUser();
    const { pokemons,addPokemon,removePokemon } = useTeamPokemonContext();
    const { addMove } = useMoveContext();
    const [ firstPokemonOption,setFirstPokemonOption ] = useState<Pokemon[] | null>(null);
    const [ selectName,setSelectName ] = useState<string|null>(null);
    const [ selectId,setSelectId ] = useState<number|null>(null);
    const [ selectIndex,setSelectIndex ] = useState<number>(-1);
    const router = useRouter();

    useEffect(()=>{
        if(user){
            const findFirstPokemon = async() => {
                const data = await fetch_player(user.id);
                // ポケモンを所持している場合は手持ちのデータをロードして、ホーム画面へ遷移する
                if(data.first_pokemon === "exist"){
                    const pks:Pokemon[] = await fetch_team_pokemon(user.id);
                    for(let i = 0; i < pks.length; i++){
                        await addPokemon(pks[i]);
                    }
                    // for(let i = 0; i < pokemons.length; i++){
                    //     for(let j = 0; j < pokemons.length; j++){
                    //         if(pokemons[i].pokemon_id === pokemons[j].pokemon_id){
                    //             await removePokemon(j);
                    //         }
                    //     }
                    // }
                    const moves = await fetch_team_move(user.id);
                    for(let i = 0; i < moves.length; i++){
                        for(let j = 0; j < moves[i].length; j++){
                            await addMove(moves[i][j]);
                        }
                    }
                    router.push("/");
                }
                const result:Pokemon[] = await fetch_first_option();
                setFirstPokemonOption(result);
            }
            findFirstPokemon();
        }
    },[user]);

    // ポケモン選択操作
    const handleSelection = (index:number) => {
        if(index === -1){
            setSelectName(null);
            setSelectId(null);
            setSelectIndex(-1);
        }
        if(firstPokemonOption){
            setSelectName(firstPokemonOption[index].name);
            setSelectId(firstPokemonOption[index].pokemon_id);
            setSelectIndex(index);
        }
    }

    // ポケモンを決定し、データベースへ登録する
    // また技のデータをここで受け取る
    // 最後にホーム画面へ遷移する
    const handleDetermination = async() =>{
        function addFirstPokemon(pokemon:Pokemon){
            pokemon.index = 1;
            pokemon.level = 1;
            pokemon.exp = 0;
            if(pokemons.length === 0)addPokemon(pokemon);
        }

        if(firstPokemonOption && selectIndex !== -1){
            const pokemon:Pokemon = firstPokemonOption[selectIndex];
            const mvs:Move[] = await send_first_pokemon(String(user?.id),Number(selectId),pokemon.move1_id,pokemon.move2_id);
            await addFirstPokemon(pokemon);
            for(let i = 0; i < mvs.length; i++){
                await addMove(mvs[i]);
            }
            router.push('/');
        }
    }


    return (
    <div>
        <Header></Header>
        <main className='text-cyan-800'>
            <div>
                <p className='text-center bg-cyan-50' >いっしょに旅をする最初のポケモンを選びましょう!</p>
                <div className='h-[70vh] bg-gradient-to-b from-gray-100 to-cyan-100 flex items-center'>
                    {firstPokemonOption ?             
                        <div className='w-[100%] flex justify-evenly'>
                            <Image onClick={()=>{handleSelection(0)}} src={firstPokemonOption[0].front_image} width={40} height={40} style={{width:100,height:100}} alt="ポケモン1"></Image>
                            <Image onClick={()=>{handleSelection(1)}} src={firstPokemonOption[1].front_image} width={40} height={40} style={{width:90,height:90}} alt="ポケモン2"></Image>
                            <Image onClick={()=>{handleSelection(2)}} src={firstPokemonOption[2].front_image} width={40} height={40} style={{width:90,height:90}} alt="ポケモン3"></Image>
                        </div>
                    : <>Nowloading...</>}
                </div>
            </div>
            <div>
                {selectName&&firstPokemonOption && 
                <div className='flex flex-col items-center gap-2 mt-2 bg-gray-50'>
                    <p>{selectName}でよいですか？</p>
                    <button onClick={()=>{handleDetermination()}} className='mt-3 mb-3' type="button">はい</button>
                    <button onClick={()=>{handleSelection(-1)}} type="button">いいえ</button>
                </div>
                }
            </div>
        </main>
        <Footer></Footer>
    </div>
    )
}
