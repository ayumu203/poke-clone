"use client"; 

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../../contexts/userContext";
import { supabase } from "../../libs/supabase";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
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
        className="h-[8vh] bg-black opacity-30 text-white text-[30px]"
      >
          ログアウト
      </button>
      <button
        onClick={()=>{router.push("/PokemonInfo")}}
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
