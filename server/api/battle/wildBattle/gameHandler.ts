import { BattlePokemon } from "../../../class/BattlePokemon.class";
import { findBattleMove } from "../../../lib/find/findBattleMove";
import { Action } from "../../../types/action.type";
import { Move } from "../../../types/move.type";
import { handleAction } from "../handler/action";
import { handleGameEnd } from "../handler/gameEnd";
import { handleAilmentEffect, handleEnemyAilmentEffect } from "../handler/ailmentEffect";
import { battle } from "../../../types/battle.type";

export const gameHandler = async (battlePokemons:BattlePokemon[],wildPokemons:BattlePokemon[],moves:Move[],action:Action):Promise<battle> => {
    let endFlag = false;
    let messages:string[] = [];
    if(battlePokemons && wildPokemons && moves && action){
        const result = handleEnemyAilmentEffect(battlePokemons,wildPokemons,moves,endFlag);
        if (result?.text) {
            messages.push(result.text);
        }

        const result2 = handleAilmentEffect(battlePokemons,wildPokemons,moves,endFlag);
        if (result2?.text) {
            messages.push(result2.text);
        }

        const result3 = handleGameEnd(battlePokemons,wildPokemons);
        if(result3.endFlag){
            endFlag = true;
            messages.push(result3.text);
            return ({ battlePokemons,wildPokemons,moves,endFlag,messages });
        }

        switch(action.action_id){
            // たたかう→技を選択
            case 1:
                let battleMove:Move = findBattleMove(battlePokemons,moves,action);
                let wildMove:Move = findBattleMove(wildPokemons,moves,{action_id:1,command_id:0});
                if(battleMove && wildMove){
                    // 先制技の優先度を比較
                    if(battleMove.priority > wildMove.priority){
                        if(battlePokemons[0].getCurrentHp() > 0 && wildPokemons[0].getCurrentHp() > 0){
                            const text:string[] = handleAction(battlePokemons,wildPokemons,battleMove);
                            if(text.length > 0){
                                messages.push(...text);
                            }
                        }
                        if(battlePokemons[0].getCurrentHp() > 0 && wildPokemons[0].getCurrentHp() > 0){
                            const text:string[] = handleAction(wildPokemons,battlePokemons,wildMove);
                            if(text.length > 0){
                                messages.push(...text);
                            }
                        }
                    }
                    else if(battleMove.priority < wildMove.priority){
                        if(battlePokemons[0].getCurrentHp() > 0 && wildPokemons[0].getCurrentHp() > 0){
                            const text:string[] = handleAction(wildPokemons,battlePokemons,wildMove);
                            if(text.length > 0){
                                messages.push(...text);
                            }
                        }
                        if(battlePokemons[0].getCurrentHp() > 0 && wildPokemons[0].getCurrentHp() > 0){
                            const text:string[] = handleAction(battlePokemons,wildPokemons,battleMove);
                            if(text.length > 0){
                                messages.push(...text);
                            }
                        }   
                    }
                    // 先制技の優先度が同じ場合
                    // すばやさを比較
                    else if(battleMove.priority == wildMove.priority && battlePokemons[0].getSpeed() >= wildPokemons[0].getSpeed()){
                        messages.push("すばやさを比較");
                        if(battlePokemons[0].getCurrentHp() > 0 && wildPokemons[0].getCurrentHp() > 0){
                            const text:string[] = handleAction(battlePokemons,wildPokemons,battleMove);
                            if(text.length > 0){
                                messages.push(...text);
                            }

                        }
                        if(battlePokemons[0].getCurrentHp() > 0 && wildPokemons[0].getCurrentHp() > 0){

                            const text = handleAction(wildPokemons,battlePokemons,wildMove);
                            if(text.length > 0){
                                messages.push(...text);
                            }
                        }
                    }
                    else if(battleMove.priority == wildMove.priority && battlePokemons[0].getSpeed() < wildPokemons[0].getSpeed()){
                        messages.push("すばやさを比較2");
                        if(battlePokemons[0].getCurrentHp() > 0 && wildPokemons[0].getCurrentHp() > 0){
                            const text:string[] = handleAction(wildPokemons,battlePokemons,wildMove);
                            if(text.length > 0){
                                messages.push(...text);
                            }
                        }
                        if(battlePokemons[0].getCurrentHp() > 0 && wildPokemons[0].getCurrentHp() > 0){
                            const messages:string[] = handleAction(battlePokemons,wildPokemons,battleMove);
                            if(messages.length > 0){
                                messages.push(...messages);
                            }
                        }
                    }
                // HPが0になった場合の処理
                    const result4 = handleGameEnd(battlePokemons,wildPokemons);
                    if(result4.endFlag){
                        endFlag = true;
                        messages.push(result4.text);
                        return ({ battlePokemons,wildPokemons,moves,endFlag,messages });
                    }
                    return ({ battlePokemons,wildPokemons,moves,endFlag,messages });
                }
                break;
            case 2:
                endFlag = true;
                messages.push(battlePokemons[0].name + "は逃げた");
                return ({ battlePokemons,wildPokemons,moves,endFlag,messages });
                break;
        }
    }
    return ({ battlePokemons,wildPokemons,moves,endFlag,messages });
}