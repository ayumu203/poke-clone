export class Rank {
    attack: number;
    defence: number;
    special_attack: number;
    special_defence: number;
    speed: number;
    accuracy: number;
    constructor(params: {
        attack: number;
        defence: number;
        special_attack: number;
        special_defence: number;
        speed: number;
        accuracy: number;
    }) {
        this.attack = params.attack;
        this.defence = params.defence;
        this.special_attack = params.special_attack;
        this.special_defence = params.special_defence;
        this.speed = params.speed;
        this.accuracy = params.accuracy;
    }
    //Getter
    getAttackRank(): number {   
        return this.attack;
    }
    getdefenceRank(): number {
        return this.defence;
    }
    getSpecialAttackRank(): number {
        return this.special_attack;
    }
    getSpecialdefenceRank(): number {
        return this.special_defence;
    }
    getSpeedRank(): number {
        return this.speed;
    }
    getAccuracyRank(): number {
        return this.accuracy;
    }
    //Setter
    setAttackRank(rank: number): void {
        this.attack = this.attack + rank;
    }
    setdefenceRank(rank: number): void {
        this.defence = this.defence + rank;
    }
    setSpecialAttackRank(rank: number): void {
        this.special_attack = this.special_attack + rank;
    }
    setSpecialdefenceRank(rank: number): void {
        this.special_defence = this.special_defence + rank;
    }
    setSpeedRank(rank: number): void {
        this.speed = this.speed + rank;
    }
    setAccuracyRank(rank: number): void {
        this.accuracy = this.accuracy + rank;
    }
}