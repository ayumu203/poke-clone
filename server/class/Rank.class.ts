export class Rank {
    #attack: number;
    #defense: number;
    #special_attack: number;
    #special_defense: number;
    #speed: number;
    #accuracy: number;
    constructor(params: {
        attack: number;
        defense: number;
        special_attack: number;
        special_defense: number;
        speed: number;
        accuracy: number;
    }) {
        this.#attack = params.attack;
        this.#defense = params.defense;
        this.#special_attack = params.special_attack;
        this.#special_defense = params.special_defense;
        this.#speed = params.speed;
        this.#accuracy = params.accuracy;
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
    getAccuracyRank(): number {
        return this.#accuracy;
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
    setAccuracyRank(rank: number): void {
        this.#accuracy = this.#accuracy + rank;
    }
}