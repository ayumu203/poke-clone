import { BattlePokemon } from "../../class/BattlePokemon.class";
import { calcAttackDamage } from "../../lib/calc/calcDamage";
import { typeCompare } from "../../lib/typeCompare";
import { Move } from "../../types/move.type";

export const handleAttack = (battlePokemons:BattlePokemon[],wildPokemons:BattlePokemon[], move:Move) => {
    const level = battlePokemons[0].getLevel();
    let atk = 0;
    let def = 0;
    let correction = 1;
    let move_power = 0;
    if(move){
        move_power = move.power
        if(move.damage_class === "physical"){
            atk = battlePokemons[0].getAttack();
            def = wildPokemons[0].getDefense();
        }
        else if(move.damage_class === "special"){
            atk = battlePokemons[0].getSpecialAttack();
            def = wildPokemons[0].getSpecialDefense();
        }
        // ステータス変化技は呼び出し前に除外済み
        const battleType = battlePokemons[0].getType();
        const wildType = wildPokemons[0].getType();
        const move_type = move.type;
    
        if(battleType === move_type){
            correction *= 1.5;
        }
        correction *= typeCompare(move_type,wildType);
    }
    return calcAttackDamage(atk,def,level,move_power,correction);
}