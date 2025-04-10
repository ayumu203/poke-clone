export type Move = {
    move_id:number,
    name:string,
    type:string,
    description:string,
    pp:number,
    power:number,
    accuracy:number,
    priority:number
    status_effect:boolean,
    status_name:string,
    status_rank:number,
    status_target:string,
    ailment_effect:boolean,
    ailment_name:string,
    ailment_chance:number,
    healing_effect:boolean,
    healing_amount:number
} | null;