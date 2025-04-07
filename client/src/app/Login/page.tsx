"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../../../contexts/userContext";
import { supabase } from "../../../libs/supabase";
import Image from "next/image";

export default function LoginPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/FirstPokemon");
    }
  }, [user]);

  return (
    <div className="">
      <div className="justify-items-center mt-10 mb-8">
        <Image width={"200"} height={"50"} src={"/logo/google-brand-color.png"} alt="Google"></Image>
      </div>
      <div className="flex justify-center">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
          onlyThirdPartyProviders
        />
      </div>
    </div>
  );
}
