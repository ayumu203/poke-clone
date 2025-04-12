import { BattlePokemon } from "../../class/BattlePokemon.class";
import { calcAttackDamage } from "../../lib/calc/calcDamage";
import { findBattleMove } from "../../lib/find/findBattleMove";
import { findMove } from "../../lib/find/findMove";
import { Action } from "../../types/action.type";
import { Move } from "../../types/move.type";
import { handleAttack } from "./handleAttack";

export const gameHandler = async (battlePokemons:BattlePokemon[],wildPokemons:BattlePokemon[],moves:Move[],action:Action) => {
    if(action){
        switch(action.action_id){
            // たたかう→技を選択
            case 1:
                // 技データの取得
                let battleMove:Move = findBattleMove(battlePokemons,moves,action);
                const damage = handleAttack(battlePokemons,wildPokemons,battleMove);
                

                if(battleMove){
                    console.log(battlePokemons[0].getName(),"は",battleMove?.name,"をつかった");
                    console.log(wildPokemons[0].getName(),"に",damage,"のダメージを与えた");
                }
        }
    }
}