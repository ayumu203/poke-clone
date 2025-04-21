import { BattlePokemon } from "../../../class/BattlePokemon.class";
import { findBattleMove } from "../../../lib/find/findBattleMove";
import { Action } from "../../../types/action.type";
import { Move } from "../../../types/move.type";
import { handleAction } from "../handler/action";
import { handleGameEnd } from "../handler/gameEnd";
import { handleAilmentEffect, handleEnemyAilmentEffect } from "../handler/ailmentEffect";
import { pushAllItem } from "../../../lib/data/pushAllItem";
import { battle } from "../../../types/battle.type";

export const gameHandler = async (battlePokemons:BattlePokemon[],wildPokemons:BattlePokemon[],moves:Move[],action:Action):Promise<battle> => {
    let endFlag = false;
    let message:string[] = [];
    if(battlePokemons && wildPokemons && moves && action){
        const result = handleEnemyAilmentEffect(battlePokemons,wildPokemons,moves,endFlag);
        if (result?.text) {
            message.push(result.text);
        }

        if(result?.endFlag){
            endFlag = true;
            return ({ battlePokemons,wildPokemons,moves,endFlag, message });
        }
        const result2 = handleAilmentEffect(battlePokemons,wildPokemons,moves,endFlag);
        if (result2?.text) {
            message.push(result2.text);
        }
        if(result2?.endFlag){
            endFlag = true;
            return ({ battlePokemons,wildPokemons,moves,endFlag,message });
        }
        
        const result3 = handleGameEnd(battlePokemons,wildPokemons);
        if(result3.endFlag){
            endFlag = true;
            return ({ battlePokemons,wildPokemons,moves,endFlag,message });
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
                                message.push(...messages);
                            }
                        }
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            const messages:string[] = handleAction(wildPokemons,battlePokemons,wildMove);
                            if(messages.length > 0){
                                message.push(...messages);
                            }
                        }
                    }
                    else if(battleMove.priority < wildMove.priority){
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            const messages:string[] = handleAction(wildPokemons,battlePokemons,wildMove);
                            if(messages.length > 0){
                                message.push(...messages);
                            }
                        }
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            const messages:string[] = handleAction(battlePokemons,wildPokemons,battleMove);
                            if(messages.length > 0){
                                message.push(...messages);
                            }
                        }
                        
                    }
                    // 先制技の優先度が同じ場合
                    // すばやさを比較
                    else if(battlePokemons[0].getSpeed() >= wildPokemons[0].getSpeed()){
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            const messages:string[] = handleAction(battlePokemons,wildPokemons,battleMove);
                            if(messages.length > 0){
                                message.push(...messages);
                            }

                        }
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            const messages = handleAction(wildPokemons,battlePokemons,wildMove);
                            if(messages.length > 0){
                                message.push(...messages);
                            }
                        }
                    }
                    else if(battlePokemons[0].getSpeed() < wildPokemons[0].getSpeed()){
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            handleAction(wildPokemons,battlePokemons,wildMove);
                            const messages = handleAction(battlePokemons,wildPokemons,battleMove);
                            if(messages.length > 0){
                                message.push(...messages);
                            }
                        }
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            const message:string[] = handleAction(battlePokemons,wildPokemons,battleMove);
                            if(message.length > 0){
                                message.push(...message);
                            }
                        }
                    }
    
                // HPが0になった場合の処理
                // 雑に書いたのでここもバグの可能性
                    const result4 = handleGameEnd(battlePokemons,wildPokemons);
                    if(result4.endFlag){
                        endFlag = true;
                        return ({ battlePokemons,wildPokemons,moves,endFlag,message });
                    }
                }
                break;
            case 2:
                endFlag = true;
                message.push(battlePokemons[0].name + "は逃げた");
                break;
        }
    }
    return ({ battlePokemons,wildPokemons,moves,endFlag,message });
}