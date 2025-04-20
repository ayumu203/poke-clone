import { BattlePokemon } from "../../../class/BattlePokemon.class";
import { findBattleMove } from "../../../lib/find/findBattleMove";
import { Action } from "../../../types/action.type";
import { Move } from "../../../types/move.type";
import { handleAction } from "../handler/action";
import { handleGameEnd } from "../handler/gameEnd";
import { handleAilmentEffect, handleEnemyAilmentEffect } from "../handler/ailmentEffect";
import { pushAllItem } from "../../../lib/data/pushAllItem";

export const gameHandler = async (battlePokemons:BattlePokemon[],wildPokemons:BattlePokemon[],moves:Move[],action:Action) => {
    let endFlag = false;
    let buffer:string[] = [];
    if(battlePokemons && wildPokemons && moves && action){
        const result = handleEnemyAilmentEffect(battlePokemons,wildPokemons,moves,endFlag);
        if (result?.text) {
            buffer.push(result.text);
        }

        if(result?.endFlag){
            endFlag = true;
            return ({ battlePokemons,wildPokemons,moves,endFlag, buffer });
        }
        const result2 = handleAilmentEffect(battlePokemons,wildPokemons,moves,endFlag);
        if (result2?.text) {
            buffer.push(result2.text);
        }
        if(result2?.endFlag){
            endFlag = true;
            return ({ battlePokemons,wildPokemons,moves,endFlag,buffer });
        }
        
        const isContinue = handleGameEnd(battlePokemons,wildPokemons);
        if(isContinue){
            endFlag = true;
            return ({ battlePokemons,wildPokemons,moves,endFlag,buffer });
        }

        switch(action.action_id){
            // たたかう→技を選択
            case 1:
                let battleMove:Move = findBattleMove(battlePokemons,moves,action);
                const random = Math.floor(Math.random() * 4 - 1) + 1;
                let wildMove:Move = findBattleMove(wildPokemons,moves,{action_id:1,command_id:random});
                if(battleMove && wildMove){
                    // 先制技の優先度を比較
                    if(battleMove.priority > wildMove.priority){
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            const messages:string[] = handleAction(battlePokemons,wildPokemons,battleMove);
                            if(messages.length > 0){
                                buffer.push(...messages);
                            }
                        }
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            const messages:string[] = handleAction(wildPokemons,battlePokemons,wildMove);
                            if(messages.length > 0){
                                buffer.push(...messages);
                            }
                        }
                    }
                    else if(battleMove.priority < wildMove.priority){
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            const messages:string[] = handleAction(wildPokemons,battlePokemons,wildMove);
                            if(messages.length > 0){
                                buffer.push(...messages);
                            }
                        }
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            const messages:string[] = handleAction(battlePokemons,wildPokemons,battleMove);
                            if(messages.length > 0){
                                buffer.push(...messages);
                            }
                        }
                        
                    }
                    // 先制技の優先度が同じ場合
                    // すばやさを比較
                    else if(battlePokemons[0].getSpeed() >= wildPokemons[0].getSpeed()){
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            const messages:string[] = handleAction(battlePokemons,wildPokemons,battleMove);
                            if(messages.length > 0){
                                buffer.push(...messages);
                            }

                        }
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            const messages = handleAction(wildPokemons,battlePokemons,wildMove);
                            if(messages.length > 0){
                                buffer.push(...messages);
                            }
                        }
                    }
                    else if(battlePokemons[0].getSpeed() < wildPokemons[0].getSpeed()){
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            handleAction(wildPokemons,battlePokemons,wildMove);
                            const messages = handleAction(battlePokemons,wildPokemons,battleMove);
                            if(messages.length > 0){
                                buffer.push(...messages);
                            }
                        }
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            const message:string[] = handleAction(battlePokemons,wildPokemons,battleMove);
                            if(message.length > 0){
                                buffer.push(...message);
                            }
                        }
                    }
    
                // HPが0になった場合の処理
                    endFlag = handleGameEnd(battlePokemons,wildPokemons);
                }
                break;
            case 2:
                endFlag = true;
                buffer.push(battlePokemons[0].name + "は逃げた");
                break;
        }
    }
    return ({ battlePokemons,wildPokemons,moves,endFlag,buffer });
}