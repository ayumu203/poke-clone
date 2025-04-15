import { BattlePokemon } from "../class/BattlePokemon.class";
import { Move } from "../types/move.type";

export const handleHealing = (user:BattlePokemon[],move:Move):void => {
    const healing_amount = move!.healing_amount / 100 * user[0].getMaxHp();
    user[0].setCurrentHp(user[0].getCurrentHp() + healing_amount);
    console.log(user[0].getName(),"は",move?.name,"をつかった");
    console.log(user[0].getName(),"のHPが",healing_amount,"回復した");
}