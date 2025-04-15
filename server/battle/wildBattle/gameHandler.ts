import { BattlePokemon } from "../../class/BattlePokemon.class";
import { findBattleMove } from "../../lib/find/findBattleMove";
import { Action } from "../../types/action.type";
import { Move } from "../../types/move.type";
import { handleAction } from "../actionHandler";

export const gameHandler = async (battlePokemons:BattlePokemon[],wildPokemons:BattlePokemon[],moves:Move[],action:Action) => {
    console.log("サーバ側の処理を開始");
    let endFlag = false;
    if(action){
        switch(action.action_id){
            // たたかう→技を選択
            case 1:
                let battleMove:Move = findBattleMove(battlePokemons,moves,action);
                let wildMove:Move = findBattleMove(wildPokemons,moves,{action_id:1,command_id:1});
                if(battleMove && wildMove){
                    // 先制技の優先度を比較
                    if(battleMove.priority > wildMove.priority){
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            handleAction(battlePokemons,wildPokemons,battleMove);
                            handleAction(wildPokemons,battlePokemons,wildMove);
                        }

                    }
                    else if(battleMove.priority < wildMove.priority){
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            handleAction(wildPokemons,battlePokemons,wildMove);
                            handleAction(battlePokemons,wildPokemons,battleMove);
                        }

                    }
                    // 先制技の優先度が同じ場合
                    // すばやさを比較
                    else if(battlePokemons[0].getSpeed() > wildPokemons[0].getSpeed()){
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            handleAction(battlePokemons,wildPokemons,battleMove);
                            handleAction(wildPokemons,battlePokemons,wildMove);
                        }
                    }
                    else{
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            handleAction(wildPokemons,battlePokemons,wildMove);
                            handleAction(battlePokemons,wildPokemons,battleMove);
                            endFlag = true;
                        }
                    }
    
                // HPが0になった場合の処理
                    if(battlePokemons[0].getCurrentHp() === 0 && wildPokemons[0].getCurrentHp() !== 0){
                        console.log(battlePokemons[0].getName(),"はもう動けない");
                        endFlag = true;
                    }
                    else if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() === 0){
                        console.log(wildPokemons[0].getName(),"はもう動けない");
                        endFlag = true;
                    }
                    else if(battlePokemons[0].getCurrentHp() === 0 && wildPokemons[0].getCurrentHp() === 0){
                        console.log(battlePokemons[0].getName(),"はもう動けない");
                        console.log(wildPokemons[0].getName(),"はもう動けない");
                        endFlag = true;
                    }
                }
                break;
        }
    }
    console.log(battlePokemons[0].getName(),"のHP",battlePokemons[0].getCurrentHp());
    console.log(wildPokemons[0].getName(),"のHP",wildPokemons[0].getCurrentHp());
    console.log("サーバ側の処理を終了");
    return ({battlePokemons,wildPokemons,moves,endFlag});
}
