import { BattlePokemon } from "../../class/BattlePokemon.class";
import { findBattleMove } from "../../lib/find/findBattleMove";
import { Action } from "../../types/action.type";
import { Move } from "../../types/move.type";
import { handleAction } from "../actionHandler";

export const gameHandler = async (battlePokemons:BattlePokemon[],wildPokemons:BattlePokemon[],moves:Move[],action:Action) => {
    let endFlag = false;
    if(action){
        const result = handleEnemyAilmentEffect(battlePokemons,wildPokemons,moves,endFlag);
        if(result?.endFlag){
            endFlag = true;
            return ({ battlePokemons,wildPokemons,moves,endFlag });
        }
        const result2 = handleAilmentEffect(battlePokemons,wildPokemons,moves,endFlag);
        if(result2?.endFlag){
            endFlag = true;
            return ({ battlePokemons,wildPokemons,moves,endFlag });
        }

        const isContinue = handleGameEnd(battlePokemons,wildPokemons);
        if(isContinue){
            endFlag = true;
            return ({ battlePokemons,wildPokemons,moves,endFlag });
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
                            handleAction(battlePokemons,wildPokemons,battleMove);
                        }
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            handleAction(wildPokemons,battlePokemons,wildMove);
                        }
                    }
                    else if(battleMove.priority < wildMove.priority){
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            handleAction(wildPokemons,battlePokemons,wildMove);
                        }
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            handleAction(battlePokemons,wildPokemons,battleMove);
                        }

                    }
                    // 先制技の優先度が同じ場合
                    // すばやさを比較
                    else if(battlePokemons[0].getSpeed() > wildPokemons[0].getSpeed()){
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            handleAction(battlePokemons,wildPokemons,battleMove);
                        }
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            handleAction(wildPokemons,battlePokemons,wildMove);
                        }
                    }
                    else if(battlePokemons[0].getSpeed() < wildPokemons[0].getSpeed()){
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            handleAction(wildPokemons,battlePokemons,wildMove);
                        }
                        if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() !== 0){
                            handleAction(battlePokemons,wildPokemons,battleMove);
                        }
                    }
    
                // HPが0になった場合の処理
                    endFlag = handleGameEnd(battlePokemons,wildPokemons);
                }
                break;
        }
    }
    console.log(battlePokemons[0].getName(),"のHP",battlePokemons[0].getCurrentHp());
    console.log(wildPokemons[0].getName(),"のHP",wildPokemons[0].getCurrentHp());
    return ({ battlePokemons,wildPokemons,moves,endFlag });
}

const handleGameEnd = (battlePokemons:BattlePokemon[],wildPokemons:BattlePokemon[]):boolean => {
    let endFlag = false;
    if(battlePokemons[0].getCurrentHp() === 0 && wildPokemons[0].getCurrentHp() !== 0){
        console.log(battlePokemons[0].getName(),"は倒れた");
        endFlag = true;
    }
    else if(battlePokemons[0].getCurrentHp() !== 0 && wildPokemons[0].getCurrentHp() === 0){
        console.log(wildPokemons[0].getName(),"は倒れた");
        endFlag = true;
    }
    else if(battlePokemons[0].getCurrentHp() === 0 && wildPokemons[0].getCurrentHp() === 0){
        console.log(battlePokemons[0].getName(),"は倒れた");
        console.log(wildPokemons[0].getName(),"は倒れた");
        endFlag = true;
    }
    return endFlag;
}

const handleAilmentEffect = (battlePokemons:BattlePokemon[],wildPokemons:BattlePokemon[],moves:Move[],endFlag:boolean) => {
    console.log(wildPokemons[0].getName(),"の状態異常",wildPokemons[0].getAilment());
    switch(wildPokemons[0].getAilment()){
        case "none":
            break;
        case "poison":
            console.log(wildPokemons[0].getName(),"は毒におかされている");
            wildPokemons[0].setCurrentHp(wildPokemons[0].getCurrentHp() - Math.floor(wildPokemons[0].getMaxHp() * 0.15));
            break;
        case "paralysis":
            console.log(wildPokemons[0].getName(),"はまひしている");
            if(Math.floor(Math.random() * 100) < 25){
                console.log(wildPokemons[0].getName(),"はまひして動けない");
                return ({ battlePokemons,wildPokemons,moves,endFlag });
            }
            break;
        case "burn":
            console.log(wildPokemons[0].getName(),"はやけどしている");
            wildPokemons[0].setCurrentHp(wildPokemons[0].getCurrentHp() - Math.floor(wildPokemons[0].getMaxHp() * 0.1));
            break;
        case "freeze":
            console.log(wildPokemons[0].getName(),"はこおっている");
            if(Math.floor(Math.random() * 100) < 50){
                console.log(wildPokemons[0].getName(),"はこおり状態から回復した");
                wildPokemons[0].setAilment("none");
            }
            else {
                return ({ battlePokemons,wildPokemons,moves,endFlag });
            }
            break;
        case "sleep":
            console.log(battlePokemons[0].getName(),"はねむっている");
            if(Math.floor(Math.random() * 100) < 50){
                console.log(battlePokemons[0].getName(),"はねむけからさめた");
                battlePokemons[0].setAilment("none");
            }
            else {
                return ({ battlePokemons,wildPokemons,moves,endFlag });
            }
            break;
    }

}

const handleEnemyAilmentEffect = (battlePokemons:BattlePokemon[],wildPokemons:BattlePokemon[],moves:Move[],endFlag:boolean) => {
    switch(battlePokemons[0].getAilment()){
        case "none":
            break;
        case "poison":
            console.log(battlePokemons[0].getName(),"は毒におかされている");
            battlePokemons[0].setCurrentHp(battlePokemons[0].getCurrentHp() - Math.floor(battlePokemons[0].getMaxHp() * 0.15));
            break;
        case "paralysis":
            console.log(battlePokemons[0].getName(),"はまひしている");
            if(Math.floor(Math.random() * 100) < 25){
                console.log(battlePokemons[0].getName(),"はまひして動けない");
                return ({ battlePokemons,wildPokemons,moves,endFlag });
            }
            break;
        case "burn":
            console.log(battlePokemons[0].getName(),"はやけどしている");
            battlePokemons[0].setCurrentHp(battlePokemons[0].getCurrentHp() - Math.floor(battlePokemons[0].getMaxHp() * 0.1));
            break;
        case "freeze":
            console.log(battlePokemons[0].getName(),"はこおっている");
            if(Math.floor(Math.random() * 100) < 50){
                console.log(battlePokemons[0].getName(),"はこおり状態から回復した");
                battlePokemons[0].setAilment("none");
            }
            else {
                return ({ battlePokemons,wildPokemons,moves,endFlag });
            }
            break;
        case "sleep":
            console.log(battlePokemons[0].getName(),"はねむっている");
            if(Math.floor(Math.random() * 100) < 50){
                console.log(battlePokemons[0].getName(),"はねむけからさめた");
                battlePokemons[0].setAilment("none");
            }
            else {
                return ({ battlePokemons,wildPokemons,moves,endFlag });
            }
            break;

        case "confusion":   
            console.log(battlePokemons[0].getName(),"はこんらんしている");
            if(Math.floor(Math.random() * 100) < 50){
                console.log(battlePokemons[0].getName(),"は自分を攻撃した");
                battlePokemons[0].setCurrentHp(battlePokemons[0].getCurrentHp() - Math.floor(battlePokemons[0].getMaxHp() * 0.1));
                return ({ battlePokemons,wildPokemons,moves,endFlag });
            }
            break;
    }
}