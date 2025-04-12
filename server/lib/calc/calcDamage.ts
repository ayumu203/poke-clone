export const calcAttackDamage = (atk:number,def:number,level:number,move_power:number,correction:number) : number => {
    return Math.floor(((((2 * level / 5 + 2) * move_power * atk / def) / 50) + 2) * correction);
}