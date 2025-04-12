import { BattlePokemon } from "../../class/BattlePokemon.class";
import { Action } from "../../types/action.type";
import { Move } from "../../types/move.type";
import { findMove } from "./findMove";

// 戦闘ポケモンの指定された技を取得する関数
// action.action_idが1の時は技1を、2の時は技2を取得する
export const findBattleMove = (battlePokemons:BattlePokemon[],moves:Move[],action:Action):Move => {
    if(action.action_id === 1){
        const moveId = battlePokemons[0].getMove1Id();
        const battleMove = findMove(moves,moveId); 
        return battleMove;
    }
    if(action.action_id === 2){
        const moveId = battlePokemons[0].getMove2Id();
        const battleMove = findMove(moves,moveId); 
        return battleMove;
    }
    return null;
}