import { BattlePokemon } from "../../../class/BattlePokemon.class";
import { Move } from "../../../types/move.type";

export const handleAilment = (battlePokemons:BattlePokemon[],opponentPokemons:BattlePokemon[],move:Move):string[] => {
    if(move){
        let messages:string[] = [];
        let text:string = battlePokemons[0].getName() + "は" + move?.name + "をつかった";
        messages.push(text);
        let chance = 0;
        // 命中判定
        if(move.move_category === "ailment")chance = move?.accuracy;
        else chance = move?.ailment_chance;
        const random = Math.floor(Math.random() * 100);
        if(chance > random){    
            opponentPokemons[0].setAilment(move.ailment_name);
            const ailment_name:string = opponentPokemons[0].getAilment();
            text = opponentPokemons[0].getName() + "は" + ailment_name + "になった";
            messages.push(text);
        }
        else {
            text = opponentPokemons[0].getName() + "の" + move?.name + "ははずれた";
            messages.push(text);
        }
        return messages;
    }
    return [""];
}