import { Move } from "../../types/move.type";

export const findMove = (moves:Move[], moveId:number):Move => {
    const move = moves.find((move) => {
        return move?.move_id === Number(moveId);
    });
    if(!move)return null;
    return move;
}