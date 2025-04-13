import { BattlePokemon } from "../class/BattlePokemon.class";
import { handleHealing } from "./healingHandler";
import { handleAttack } from "./attackHandler";
import { statusRankHandler } from "./statusRankHandler";
import { handleAilment } from "./ailmentHandler";
import { Move } from "../types/move.type";

export const handleAction = (attacker:BattlePokemon[],defender:BattlePokemon[],move:Move) => {
    // ここで回復技のみ実行
    if(move?.damage_class === "status"){
        if(move.healing_effect === true){
            const healing_amount:number = handleHealing(attacker,move);
            attacker[0].setCurrentHp(attacker[0].getCurrentHp() + healing_amount);
            console.log(attacker[0].getName(),"は",move?.name,"をつかった");
            console.log(attacker[0].getName(),"のHPが",healing_amount,"回復した");
        }
    }
    // ここで攻撃技を実行
    else if (move?.damage_class === "physical" || move?.damage_class === "special"){
        const damage:number = handleAttack(attacker,defender,move);
        defender[0].setCurrentHp(defender[0].getCurrentHp() - damage);
        if(defender[0].getCurrentHp() < 0){
            defender[0].setCurrentHp(0);
        }
        console.log(attacker[0].getName(),"は",move?.name,"をつかった");
        console.log(defender[0].getName(),"に",damage,"のダメージを与えた");
    }
    // ステータス変化
    if(move?.status_effect){
        statusRankHandler(attacker,defender,move);
    }
    // 状態異常
    if(move?.ailment_effect){
        const ailment_name:string = handleAilment(attacker,defender,move);
    }
}
