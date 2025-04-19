import { BattlePokemon } from "../../class/BattlePokemon.class";
import { Move } from "../../types/move.type";
import { pushAllItem } from "../../lib/pushAllItem";
import { handleHealing } from "../../api/battle/handler/healing";
import { handleAttack } from "../../api/battle/handler/attack";
import { handleStatusRank } from "../../api/battle/handler/statusRank";
import { handleAilment } from "../../api/battle/handler/ailment";

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
