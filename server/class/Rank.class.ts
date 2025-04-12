export class Rank {
    #attack: number;
    #defense: number;
    #special_attack: number;
    #special_defense: number;
    #speed: number;
    constructor(params: {
        attack: number;
        defense: number;
        special_attack: number;
        special_defense: number;
        speed: number;
    }) {
        this.#attack = params.attack;
        this.#defense = params.defense;
        this.#special_attack = params.special_attack;
        this.#special_defense = params.special_defense;
        this.#speed = params.speed;
    }
    //Getter
    getAttackRank(): number {   
        return this.#attack;
    }
    getDefenseRank(): number {
        return this.#defense;
    }
    getSpecialAttackRank(): number {
        return this.#special_attack;
    }
    getSpecialDefenseRank(): number {
        return this.#special_defense;
    }
    getSpeedRank(): number {
        return this.#speed;
    }
    //Setter
    setAttackRank(rank: number): void {
        this.#attack = this.#attack + rank;
    }
    setDefenseRank(rank: number): void {
        this.#defense = this.#defense + rank;
    }
    setSpecialAttackRank(rank: number): void {
        this.#special_attack = this.#special_attack + rank;
    }
    setSpecialDefenseRank(rank: number): void {
        this.#special_defense = this.#special_defense + rank;
    }
    setSpeedRank(rank: number): void {
        this.#speed = this.#speed + rank;
    }
}