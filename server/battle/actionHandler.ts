import { BattlePokemon } from "../class/BattlePokemon.class";
import { handleHealing } from "./healingHandler";
import { handleAttack } from "./attackHandler";
import { handleAilment } from "./ailmentHandler";
import { Move } from "../types/move.type";
import { handleStatusRank } from "./statusRankHandler";

export const handleAction = (attacker:BattlePokemon[],defender:BattlePokemon[],move:Move) => {
    // 回復技
    switch(move!.move_category){
        case "heal":
            handleHealing(attacker,move);
            break;
        case "damage":
            handleAttack(attacker,defender,move);
            break;
        case "damage+raise":
            handleAttack(attacker,defender,move);
            handleStatusRank(attacker,defender,move);
            break ;
        case "damage+lower":
            handleAttack(attacker,defender,move);
            handleStatusRank(attacker,defender,move);
            break ;
        case "damage+ailment":
            handleAttack(attacker,defender,move);
            handleAilment(attacker,defender,move);
            break ;
        case "net-good-stats":
            handleStatusRank(attacker,defender,move);
            break ;
        case "ailment":
            console.log(attacker[0].getName(),"は",move?.name,"を使った");
            handleAilment(attacker,defender,move);
            break ;
    }
}
