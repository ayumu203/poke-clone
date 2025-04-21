import { BattlePokemon } from "../../../class/BattlePokemon.class";

export const handleGameEnd = (battlePokemons:BattlePokemon[],wildPokemons:BattlePokemon[]) => {
    let endFlag = false;
    let text = "";
    if(battlePokemons[0].getCurrentHp() === 0 && wildPokemons[0].getCurrentHp() !== 0){
        text = battlePokemons[0].getName() + "は倒れた";
        endFlag = true;
    }
    else if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() === 0){
        text = wildPokemons[0].getName() + "は倒れた";
        endFlag = true;
    }
    else if(battlePokemons[0].getCurrentHp() === 0 && wildPokemons[0].getCurrentHp() === 0){
        text = battlePokemons[0].getName() + "と" + wildPokemons[0].getName() + "は倒れた";
        endFlag = true;
    }
    return { battlePokemons,wildPokemons,endFlag,text };
}

