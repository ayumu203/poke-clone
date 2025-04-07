"use client"; 

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../../contexts/userContext";
import { supabase } from "../../libs/supabase";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { useTeamPokemonContext } from "../../contexts/teamContext";

export default function Home() {
  const { user } = useUser();
  const { pokemons,removePokemon } = useTeamPokemonContext();
  const router = useRouter();

  const handlePageMove = (to:string) => {
    router.push(to);
  }

  useEffect(() => {
    if (!user) {
      router.push("/Login");
    }

    const seenPokemonIds = new Set();
    const duplicateIndices = [];
  
    // まず、すべての重複を特定する
    for (let i = 0; i < pokemons.length; i++) {
      const pokemonId = pokemons[i].pokemon_id;
      if (seenPokemonIds.has(pokemonId)) {
        duplicateIndices.push(i);
      } else {
        seenPokemonIds.add(pokemonId);
      }
    }

    // 次に、配列の末尾から順に重複を削除する
    // これにより、まだ処理していないアイテムのインデックスがずれません
    for (let i = duplicateIndices.length - 1; i >= 0; i--) {
      removePokemon(duplicateIndices[i]);
    }
  

  }, [user]);
  if (!user) return (<>Now loading...</>); // ログインしてない場合は一旦何も表示しない
  return (
    <div className="h-[100vh] bg-cyan-50">
      <header>
        <Header></Header>
      </header>
      <main className="flex h-192 bg-[url(/001_home.png)]">
      <button 
        onClick={()=>{supabase.auth.signOut()}}
        className="h-[8vh] bg-black opacity-30 text-white text-[30px]"
      >
          ログアウト
      </button>
      <button
        onClick={()=>{handlePageMove('PokemonInfo')}}
        style={{
          position:"absolute",
          top:"30%",
          left:"48%"
        }}
        className="h-[8vh] bg-green-800 opacity-30 text-white text-[30px]"
      >
        ポケモン
      </button>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}
// onClick={()=>supabase.auth.signOut()}