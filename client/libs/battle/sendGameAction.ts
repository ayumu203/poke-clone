import { Action } from "../../types/action.type";
import { BattlePokemon } from "../../types/battlePokemon.type";
import { Move } from "../../types/Move";

export const send_game_action = async (battlePokemons:BattlePokemon[],wildPokemons:BattlePokemon[],moves:Move[],action:Action) => {
    const base_url = process.env.NEXT_PUBLIC_API_URL;
    const url = `${base_url}/battle/wildBattle/handle`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ battlePokemons:battlePokemons,wildPokemons:wildPokemons,moves:moves,action:action }),
        }); 
        if (!response.ok) {
            throw new Error('response error');
        }
        const data = await response.json();
        // console.log("バトルのデータ取得", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}