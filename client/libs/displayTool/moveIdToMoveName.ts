import { Move } from "../../types/Move";

export const idToName = (id:number,moves:Move[]):string =>{
    for(let i = 0; i < moves.length; i++){
        if(moves[i].move_id === id)return moves[i].name;  
    }
    return "";
}
