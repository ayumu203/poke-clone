import { calcPokemonRealHp, calcPokemonRealStats } from "../lib/calc/calcPokemonStats";
import { Pokemon } from "../types/pokemon.types";
import { Rank } from "./Rank.class";

export class BattlePokemon {
    pokemon_id: number;
    pokemon_index: number;
    level: number;
    exp: number;
    name: string;
    type: string;
    image: string;
    max_hp: number;
    current_hp: number;
    attack: number;
    defence: number;
    special_attack: number;
    special_defence: number;
    speed: number;
    move_list: number[];
    rank: Rank;
    ailment: string;
    constructor(params: {
        pokemon: Pokemon;
        pokemon_index: number;
        level: number;
        exp: number;
        image: string;
    }){
        //初期化
        if(!params.pokemon){
            throw new Error("pokemon is required");
        }
        this.pokemon_id = params.pokemon.pokemon_id;
        this.pokemon_index = params.pokemon_index;
        this.level = params.level;
        this.exp = params.exp;
        this.name = params.pokemon.name;
        this.type = params.pokemon.type;
        this.image = params.image;
        this.max_hp = calcPokemonRealHp(params.pokemon.base_hp, params.level);
        this.current_hp = this.max_hp;
        this.attack = calcPokemonRealStats(params.pokemon.base_attack, params.level);
        this.defence = calcPokemonRealStats(params.pokemon.base_defence, params.level); 
        this.special_attack = calcPokemonRealStats(params.pokemon.base_special_attack, params.level);
        this.special_defence = calcPokemonRealStats(params.pokemon.base_special_defence, params.level);
        this.speed = calcPokemonRealStats(params.pokemon.base_speed, params.level);
        this.move_list = params.pokemon.move_list;
        this.rank = new Rank({
            attack: 0,
            defence: 0,
            special_attack: 0,
            special_defence: 0,
            speed: 0,
            accuracy: 0
        });
        this.ailment = "none";
    }
    //Getter
    getPokemonId(): number{
        return this.pokemon_id;
    }
    getPokemonIndex(): number{
        return this.pokemon_index;
    }
    getName(): string{
        return this.name;
    }
    getType(): string{
        return this.type;
    }
    getImage(): string{
        return this.image;
    }
    getLevel(): number{
        return this.level;
    }
    getExp(): number{    
        return this.exp;
    }
    getMoveList(): Array<number>{
        return this.move_list;
    }
    getRank(): Rank{
        return this.rank;
    }
    getAilment(): string{
        return this.ailment;
    }
    getMaxHp(): number{
        return this.max_hp;
    }
    getCurrentHp(): number{
        return this.current_hp;
    }
    getAttack(): number{
        return this.attack;
    }
    getdefence(): number{
        return this.defence;
    }
    getSpecialAttack(): number{
        return this.special_attack;
    }
    getSpecialdefence(): number{
        return this.special_defence;
    }
    getSpeed(): number{
        return this.speed;
    }
    //Setter
    setCurrentHp(current_hp: number): void{
        if(this.max_hp < current_hp){
            this.current_hp = this.max_hp;
        } 
        else {
            this.current_hp = current_hp;
        }   
    }
    setAilment(ailment: string): void{
        this.ailment = ailment;
    }
    setRank(status: string, rank: number): void{
        switch(status){
            case "attack":
                this.rank.setAttackRank(rank);
                break;
            case "defence":
                this.rank.setdefenceRank(rank);
                break;
            case "special_attack":          
                this.rank.setSpecialAttackRank(rank);
                break;
            case "special_defence":
                this.rank.setSpecialdefenceRank(rank);
                break;
            case "speed":
                this.rank.setSpeedRank(rank);
                break;
            default:
                throw new Error("Invalid status");
            }   
    }
    setExp(exp: number): void{
        this.exp = exp;
    } 
    setMoveList(move_list: Array<number>): void{
        this.move_list = move_list;
    }
}