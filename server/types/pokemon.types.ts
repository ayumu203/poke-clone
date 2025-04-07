export type Pokemon = {
    pokemon_id:number,
    name:string,
    type:string,
    front_image:string,
    back_image:string,
    base_hp:number,
    base_attack:number,
    base_defence:number,
    base_special_attack:number,
    base_special_defence:number,
    base_speed:number,
    move1_id:number,
    move2_id:number,
    is_evolve:Boolean
} | null;