import { BattlePokemon } from "../../../class/BattlePokemon.class";
import { Move } from "../../../types/move.type";

export const handleHealing = (user:BattlePokemon[],move:Move):string[] => {
    const healing_amount = Math.floor(move!.healing_amount / 100 * user[0].getMaxHp());
    user[0].setCurrentHp(user[0].getCurrentHp() + healing_amount);
    let text = user[0].getName() + "は" + move?.name + "をつかった";
    let text2 = user[0].getName() + "のHPが" + healing_amount + "回復した";
    return [text,text2];
}