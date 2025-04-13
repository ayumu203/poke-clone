import { BattlePokemon } from "../class/BattlePokemon.class";
import { Move } from "../types/move.type";

export const statusRankHandler = (battlePokemons:BattlePokemon[],opponentPokemons:BattlePokemon[],battleMove:Move):void => {
    if(battleMove?.status_name === "attack"){
        const newRank = opponentPokemons[0].getRank().getAttackRank() + battleMove.status_rank;
        if(battleMove?.status_target === "selected-pokemon" || "all-ooponents"){
            opponentPokemons[0].getRank().setAttackRank(newRank);
            console.log(opponentPokemons[0].getName(),"のこうげきが",battleMove.status_rank,"段階変化した");
            console.log(opponentPokemons[0].getName(),"の現在の攻撃ランク",opponentPokemons[0].getRank().getAttackRank());
        }
        else if(battleMove?.status_target === "user"){
            battlePokemons[0].getRank().setAttackRank(newRank);
            console.log(battlePokemons[0].getName(),"のこうげきが",battleMove.status_rank,"段階変化した");
            console.log(battlePokemons[0].getName(),"の現在の攻撃ランク",battlePokemons[0].getRank().getAttackRank());
        }
    }
    else if(battleMove?.status_name === "defense"){
        const newRank = opponentPokemons[0].getRank().getDefenseRank() + battleMove.status_rank;
        if(battleMove?.status_target === "selected-pokemon" || "all-ooponents"){
            opponentPokemons[0].getRank().setDefenseRank(newRank);
            console.log(opponentPokemons[0].getName(),"のぼうぎょが",battleMove.status_rank,"段階変化した");
            console.log(opponentPokemons[0].getName(),"の現在の防御ランク",opponentPokemons[0].getRank().getDefenseRank());
        }
        else if(battleMove?.status_target === "user"){
            battlePokemons[0].getRank().setDefenseRank(newRank);
            console.log(battlePokemons[0].getName(),"のぼうぎょが",battleMove.status_rank,"段階変化した");
            console.log(battlePokemons[0].getName(),"の現在の防御ランク",battlePokemons[0].getRank().getDefenseRank());
        }
    }
    else if(battleMove?.status_name === "special-attack"){      
        const newRank = opponentPokemons[0].getRank().getSpecialAttackRank() + battleMove.status_rank;
        if(battleMove?.status_target === "selected-pokemon" || "all-ooponents"){
            opponentPokemons[0].getRank().setSpecialAttackRank(newRank);
            console.log(opponentPokemons[0].getName(),"のとくこうが",battleMove.status_rank,"段階変化した");
            console.log(opponentPokemons[0].getName(),"の現在の特攻ランク",opponentPokemons[0].getRank().getSpecialAttackRank());
        }
        else if(battleMove?.status_target === "user"){
            battlePokemons[0].getRank().setSpecialAttackRank(newRank);
            console.log(battlePokemons[0].getName(),"のとくこうが",battleMove.status_rank,"段階変化した");
            console.log(battlePokemons[0].getName(),"の現在の特攻ランク",battlePokemons[0].getRank().getSpecialAttackRank());
        }
    }
    else if(battleMove?.status_name === "special-defense"){
        const newRank = opponentPokemons[0].getRank().getSpecialDefenseRank() + battleMove.status_rank;
        if(battleMove?.status_target === "selected-pokemon" || "all-ooponents"){
            opponentPokemons[0].getRank().setSpecialDefenseRank(newRank);
            console.log(opponentPokemons[0].getName(),"のとくぼうが",battleMove.status_rank,"段階変化した");
            console.log(opponentPokemons[0].getName(),"の現在の特防ランク",opponentPokemons[0].getRank().getSpecialDefenseRank());
        }
        else if(battleMove?.status_target === "user"){
            battlePokemons[0].getRank().setSpecialDefenseRank(newRank);
            console.log(battlePokemons[0].getName(),"のとくぼうが",battleMove.status_rank,"段階変化した");
            console.log(battlePokemons[0].getName(),"の現在の特防ランク",battlePokemons[0].getRank().getSpecialDefenseRank());
        }
    }
    else if(battleMove?.status_name === "speed"){
        const newRank = opponentPokemons[0].getRank().getSpeedRank() + battleMove.status_rank;
        if(battleMove?.status_target === "selected-pokemon" || "all-ooponents"){
            opponentPokemons[0].getRank().setSpeedRank(newRank);
            console.log(opponentPokemons[0].getName(),"のすばやさが",battleMove.status_rank,"段階変化した");
            console.log(opponentPokemons[0].getName(),"の現在の素早さランク",opponentPokemons[0].getRank().getSpeedRank());
        }
        else if(battleMove?.status_target === "user"){
            battlePokemons[0].getRank().setSpeedRank(newRank);
            console.log(battlePokemons[0].getName(),"のすばやさが",battleMove.status_rank,"段階変化した");
            console.log(battlePokemons[0].getName(),"の現在の素早さランク",battlePokemons[0].getRank().getSpeedRank());
        }
    }
    else if(battleMove?.status_name === "accuracy"){
        const newRank = opponentPokemons[0].getRank().getAccuracyRank() + battleMove.status_rank;
        if(battleMove?.status_target === "selected-pokemon" || "all-ooponents"){
            opponentPokemons[0].getRank().setAccuracyRank(newRank);
            console.log(opponentPokemons[0].getName(),"の命中率が",battleMove.status_rank,"段階変化した");
            console.log(opponentPokemons[0].getName(),"の現在の命中率ランク",opponentPokemons[0].getRank().getAccuracyRank());
        }
        else if(battleMove?.status_target === "user"){
            battlePokemons[0].getRank().setAccuracyRank(newRank);
            console.log(battlePokemons[0].getName(),"の命中率が",battleMove.status_rank,"段階変化した");
            console.log(battlePokemons[0].getName(),"の現在の命中率ランク",battlePokemons[0].getRank().getAccuracyRank());
        }
    }
}