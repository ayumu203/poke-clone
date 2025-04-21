import { BattlePokemon } from "../../../class/BattlePokemon.class";
import { handleHealing } from "./healing";
import { Move } from "../../../types/move.type";
import { handleStatusRank } from "./statusRank";
import { handleAilment } from "./ailment";
import { handleAttack } from "./attack";
import { pushAllItem } from "../../../lib/data/pushAllItem";

export const handleAction = (attacker:BattlePokemon[],defender:BattlePokemon[],move:Move):string[] => {
    let messages:string[] = [];
    switch(move!.move_category){
        case "heal":
            messages = pushAllItem(messages,handleHealing(attacker,move));
            break;
        case "damage":
            messages = pushAllItem(messages,handleAttack(attacker,defender,move));
            break;
        case "damage+raise":
            messages = pushAllItem(messages,handleAttack(attacker,defender,move));
            messages = pushAllItem(messages,handleStatusRank(attacker,defender,move));
            break ;
        case "damage+lower":
            messages = pushAllItem(messages,handleAttack(attacker,defender,move));
            messages = pushAllItem(messages,handleStatusRank(defender,attacker,move));
            break ;
        case "damage+ailment":
            messages = pushAllItem(messages,handleAttack(attacker,defender,move));
            messages = pushAllItem(messages,handleAilment(attacker,defender,move));
            break ;
        case "net-good-stats":
            messages = pushAllItem(messages,handleStatusRank(attacker,defender,move));
            break ;
        case "ailment":
            messages = pushAllItem(messages,handleAilment(attacker,defender,move));
            break ;
    }
    return messages;
}
