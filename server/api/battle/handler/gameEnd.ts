import { BattlePokemon } from "../../../class/BattlePokemon.class";

export const handleGameEnd = (battlePokemons:BattlePokemon[],wildPokemons:BattlePokemon[]):boolean => {
    let endFlag = false;
    if(battlePokemons[0].getCurrentHp() === 0 && wildPokemons[0].getCurrentHp() !== 0){
        console.log(battlePokemons[0].getName(),"は倒れた");
        endFlag = true;
    }
    else if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() === 0){
        console.log(wildPokemons[0].getName(),"は倒れた");
        endFlag = true;
    }
    else if(battlePokemons[0].getCurrentHp() === 0 && wildPokemons[0].getCurrentHp() === 0){
        console.log(battlePokemons[0].getName(),"は倒れた");
        console.log(wildPokemons[0].getName(),"は倒れた");
        endFlag = true;
    }
    return endFlag;
}

