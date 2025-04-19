import { BattlePokemon } from "../../class/BattlePokemon.class";
import { findBattleMove } from "../../lib/find/findBattleMove";
import { Action } from "../../types/action.type";
import { Move } from "../../types/move.type";
import { handleAction } from "../actionHandler";

export const gameHandler = async (battlePokemons:BattlePokemon[],wildPokemons:BattlePokemon[],moves:Move[],action:Action) => {
    let endFlag = false;
    const messages:string[] = [];
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
                const random = Math.floor(Math.random() * 3 - 0) + 0;
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
                    else if(battlePokemons[0].getSpeed() >= wildPokemons[0].getSpeed()){
                        console.log(battleMove?.name,":",wildMove?.name);
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
    let text = "";
    switch(wildPokemons[0].getAilment()){
        case "none":
            break;
        case "poison":
            text = wildPokemons[0].getName() + "は毒におかされている";
            wildPokemons[0].setCurrentHp(wildPokemons[0].getCurrentHp() - Math.floor(wildPokemons[0].getMaxHp() * 0.15));
            return ({ battlePokemons,wildPokemons,moves,endFlag, text});
        case "paralysis":
            text = wildPokemons[0].getName() + "はまひしている";
            if(Math.floor(Math.random() * 100) < 25){
                const text = wildPokemons[0].getName() + "はまひして動けない";
                return ({ battlePokemons,wildPokemons,moves,endFlag, text });
            }
            return ({ battlePokemons,wildPokemons,moves,endFlag, text });
        case "burn":
            text = wildPokemons[0].getName() + "はやけどしている";
            wildPokemons[0].setCurrentHp(wildPokemons[0].getCurrentHp() - Math.floor(wildPokemons[0].getMaxHp() * 0.1));
            return ({ battlePokemons,wildPokemons,moves,endFlag, text });
        case "freeze":
            text = wildPokemons[0].getName() + "はこおっている";
            if(Math.floor(Math.random() * 100) < 50){
                const text = wildPokemons[0].getName() + "はこおり状態から回復した";
                wildPokemons[0].setAilment("none");
                return ({ battlePokemons,wildPokemons,moves,endFlag,text });
            }
            return ({ battlePokemons,wildPokemons,moves,endFlag, text });
        case "sleep":
            text = battlePokemons[0].getName() + "はねむっている";
            if(Math.floor(Math.random() * 100) < 50){
                const text =battlePokemons[0].getName() + "はねむけからさめた";
                battlePokemons[0].setAilment("none");
                return ({ battlePokemons,wildPokemons,moves,endFlag,text });
            }
            return ({ battlePokemons,wildPokemons,moves,endFlag, text });
    }

}

const handleEnemyAilmentEffect = (battlePokemons:BattlePokemon[],wildPokemons:BattlePokemon[],moves:Move[],endFlag:boolean) => {
    let text = "";
    switch(battlePokemons[0].getAilment()){
        case "none":
            break;
        case "poison":
            text = battlePokemons[0].getName() + "は毒におかされている";
             battlePokemons[0].setCurrentHp(battlePokemons[0].getCurrentHp() - Math.floor(battlePokemons[0].getMaxHp() * 0.15));
            return ({ battlePokemons,wildPokemons,moves,endFlag, text });
        case "paralysis":
            text = battlePokemons[0].getName() + "はまひしている";
            if(Math.floor(Math.random() * 100) < 25){
                console.log(battlePokemons[0].getName(),"はまひして動けない");
                return ({ battlePokemons,wildPokemons,moves,endFlag,text });
            }
            break;
        case "burn":
            text = battlePokemons[0].getName() + "はやけどしている";
            battlePokemons[0].setCurrentHp(battlePokemons[0].getCurrentHp() - Math.floor(battlePokemons[0].getMaxHp() * 0.1));
            return ({ battlePokemons,wildPokemons,moves,endFlag, text });
            break;
        case "freeze":
            text = battlePokemons[0].getName() + "はこおっている";
            if(Math.floor(Math.random() * 100) < 50){
                const text = battlePokemons[0].getName() + "はこおり状態から回復した";
                battlePokemons[0].setAilment("none");
                return ({ battlePokemons,wildPokemons,moves,endFlag,text });    
            }
            return ({ battlePokemons,wildPokemons,moves,endFlag, text });
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