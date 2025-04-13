import { BattlePokemon } from "../class/BattlePokemon.class";
import { Move } from "../types/move.type";

export const handleAilment = (battlePokemons:BattlePokemon[],opponentPokemons:BattlePokemon[],battleMove:Move):string => {
    if(battleMove){
        const chance = battleMove?.ailment_chance;
        const random = Math.floor(Math.random() * 100);
        console.log(chance,":",random)
        if(chance > random){    
            console.log("呼び出し",chance > random)
            opponentPokemons[0].setAilment(battleMove.ailment_name);
            const ailment_name:string = opponentPokemons[0].getAilment();
            console.log(opponentPokemons[0].getName(),"に",battleMove?.ailment_name,"を与えた");
        }
    }
    return "none"
}