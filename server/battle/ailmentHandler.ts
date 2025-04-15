import { BattlePokemon } from "../class/BattlePokemon.class";
import { Move } from "../types/move.type";

export const handleAilment = (battlePokemons:BattlePokemon[],opponentPokemons:BattlePokemon[],move:Move):string => {
    if(move){
        let chance = 0;
        if(move.move_category === "ailment")chance = move?.accuracy;
        else chance = move?.ailment_chance;
        console.log("命中:",chance);
        const random = Math.floor(Math.random() * 100);
        if(chance > random){    
            opponentPokemons[0].setAilment(move.ailment_name);
            const ailment_name:string = opponentPokemons[0].getAilment();
            console.log(opponentPokemons[0].getName(),"に",move?.ailment_name,"を与えた");
        }
    }
    return "none"
}