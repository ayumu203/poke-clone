"use client"; 

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../../contexts/userContext";
import { supabase } from "../../libs/supabase";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { usePlayer } from "../../contexts/playerContext";
import { useTeamPokemonContext } from "../../contexts/teamContext";

export default function Home() {
  const { user } = useUser();
  const { player } = usePlayer();
  const { pokemons } = useTeamPokemonContext();
  const router = useRouter();

  useEffect(() => {
    if (!user || !player || !pokemons || pokemons.length === 0) {
      router.push("/Login");
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
        className="h-[8vh] bg-black opacity-30 text-white text-[30px]">
          ログアウト
      </button>
      <button
        onClick={()=>{router.push("/PokemonInfo")}}
        style={{
          position:"absolute",
          top:"30%",
          left:"48%"
        }}
        className="h-[8vh] bg-green-800 opacity-25 text-white text-[30px]"
      >
        ポケモン
      </button>
      <button
        onClick={()=>{router.push("/WildBattle")}}
        style={{
          position:"absolute",
          top:"20%",
          left:"65%"
        }}
        className="h-[8vh] bg-orange-450 opacity-60 text-white text-[30px]"
      >
        サファリ
      </button>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}
