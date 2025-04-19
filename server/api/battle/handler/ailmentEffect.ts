import { BattlePokemon } from "../../../class/BattlePokemon.class";
import { Move } from "../../../types/move.type";

export const handleAilmentEffect = (battlePokemons:BattlePokemon[],wildPokemons:BattlePokemon[],moves:Move[],endFlag:boolean) => {
    let text:string = "";
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
    return
}

export const handleEnemyAilmentEffect = (battlePokemons:BattlePokemon[],wildPokemons:BattlePokemon[],moves:Move[],endFlag:boolean) => {
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
                text = battlePokemons[0].getName() + "はまひして動けない";
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
            text = battlePokemons[0].getName() + "はねむっている";
            if(Math.floor(Math.random() * 100) < 50){
                text = battlePokemons[0].getName() + "はねむけからさめた";
                battlePokemons[0].setAilment("none");
            }
            else {
                return ({ battlePokemons,wildPokemons,moves,endFlag,text });
            }
            break;

        case "confusion":   
            text = battlePokemons[0].getName() + "はこんらんしている";
            if(Math.floor(Math.random() * 100) < 50){
                text = battlePokemons[0].getName() + "はこんらんして自分を攻撃した";
                battlePokemons[0].setCurrentHp(battlePokemons[0].getCurrentHp() - Math.floor(battlePokemons[0].getMaxHp() * 0.1));
                return ({ battlePokemons,wildPokemons,moves,endFlag });
            }
            
            if(Math.floor(Math.random() * 100) < 50){
                text = battlePokemons[0].getName() + "はこんらんから回復した";
                battlePokemons[0].setAilment("none");
                return ({ battlePokemons,wildPokemons,moves,endFlag,text });
            }
            break;
    }
    return { battlePokemons,wildPokemons,moves,endFlag };
}