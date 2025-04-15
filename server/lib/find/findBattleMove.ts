import { BattlePokemon } from "../../class/BattlePokemon.class";
import { Action } from "../../types/action.type";
import { Move } from "../../types/move.type";
import { findMove } from "./findMove";

// 戦闘ポケモンの指定された技を取得する関数
export const findBattleMove = (battlePokemons:BattlePokemon[],moves:Move[],action:Action):Move => {
    const moveId = battlePokemons[0].getMoveList()[action.command_id - 1];
    const battleMove = findMove(moves,moveId);
    return battleMove;
}