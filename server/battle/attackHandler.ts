import { BattlePokemon } from "../class/BattlePokemon.class";
import { calcAttackDamage } from "../lib/calc/calcDamage";
import { typeCompare } from "../lib/typeCompare";
import { Move } from "../types/move.type";

export const handleAttack = (attacker:BattlePokemon[],defender:BattlePokemon[], move:Move):void => {
    console.log(attacker[0].getName(),"は",move?.name,"をつかった");
    const level = attacker[0].getLevel();
    let move_power = 0;
    let correction = 1;
    let atk = 0;
    let def = 0;
    if(move){
        move_power = move.power;
        // 物理技なら攻撃・防御を,特殊技なら特攻・特防を割り当てる
        if(move.damage_class === "physical"){
            atk = attacker[0].getAttack() * ( 1 + attacker[0].getRank().getAttackRank() / 2);
            def = defender[0].getDefense() * ( 1 + defender[0].getRank().getDefenseRank() / 2);
        }
        else if(move.damage_class === "special"){
            atk = attacker[0].getSpecialAttack() * ( 1 + attacker[0].getRank().getSpecialAttackRank() / 2);
            def = defender[0].getSpecialDefense() * ( 1 + defender[0].getRank().getSpecialDefenseRank() / 2);
        }
        // ステータス変化技は呼び出し前に除外済み
        const battleType = attacker[0].getType();
        const wildType = defender[0].getType();
        const move_type = move.type;
    
        // タイプ一致補正
        if(battleType === move_type){
            correction *= 1.5;
        }
        // タイプ相性補正
        correction *= typeCompare(move_type,wildType);
        // やけど補正
        if(attacker[0].getAilment() === "burn" && move.damage_class === "physical"){
            correction *= 0.5;
        }
    }
    const damage = calcAttackDamage(atk,def,level,move_power,correction);
    defender[0].setCurrentHp(defender[0].getCurrentHp() - damage);
    if(defender[0].getCurrentHp() < 0){
        defender[0].setCurrentHp(0);
    }
    console.log(defender[0].getName(),"に",damage,"のダメージを与えた");

}