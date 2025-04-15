import { BattlePokemon } from "../class/BattlePokemon.class";
import { handleHealing } from "./healingHandler";
import { handleAttack } from "./attackHandler";
import { statusRankHandler } from "./statusRankHandler";
import { handleAilment } from "./ailmentHandler";
import { Move } from "../types/move.type";

export const handleAction = (attacker:BattlePokemon[],defender:BattlePokemon[],move:Move) => {
    // 回復技
    if(move!.move_category === "heal"){
        const healing_amount:number = handleHealing(attacker,move);
        attacker[0].setCurrentHp(attacker[0].getCurrentHp() + healing_amount);
        console.log(attacker[0].getName(),"は",move?.name,"をつかった");
        console.log(attacker[0].getName(),"のHPが",healing_amount,"回復した");
        return ;
    }
    // 攻撃技
    else if(move!.move_category === "damage" || move!.move_category === "damage+ailment"){
        const damage:number = handleAttack(attacker,defender,move);
        console.log("ダメージ:",damage);
        defender[0].setCurrentHp(defender[0].getCurrentHp() - damage);
        if(defender[0].getCurrentHp() < 0){
            defender[0].setCurrentHp(0);
        }
        console.log(attacker[0].getName(),"は",move?.name,"をつかった");
        console.log(defender[0].getName(),"に",damage,"のダメージを与えた");
    }
    // ステータス変化
    if(move!.move_category === "net-good-stats"){
        statusRankHandler(attacker,defender,move);
        console.log(attacker[0].getName(),"は",move?.name,"をつかった");
    }

}
