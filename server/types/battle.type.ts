import { BattlePokemon } from "../class/BattlePokemon.class";
import { Move } from "./move.type";

export type battle = {
    turn: number;
    battlePokemons: BattlePokemon[];
    wildPokemons: BattlePokemon[];
    moves: Move[];
    endFlag: boolean;
    message: string[];
} | null;