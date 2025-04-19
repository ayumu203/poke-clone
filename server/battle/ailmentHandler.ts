import { BattlePokemon } from "../class/BattlePokemon.class";
import { Move } from "../types/move.type";

export const handleAilment = (battlePokemons:BattlePokemon[],opponentPokemons:BattlePokemon[],move:Move):string => {
    if(move){
        let chance = 0;
        if(move.move_category === "ailment")chance = move?.accuracy;
        else chance = move?.ailment_chance;
        const random = Math.floor(Math.random() * 100);
        if(chance > random){    
            opponentPokemons[0].setAilment(move.ailment_name);
            const ailment_name:string = opponentPokemons[0].getAilment();
        }
    }
    return "none"
}