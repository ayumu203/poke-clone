export const calcPokemonRealHp = (hp:number,level:number):number => {
    return Math.floor((hp * 2 + Math.floor(hp / 100) + level) / 4) + level + 10;
}
export const calcPokemonRealStats = (stats:number,level:number):number => {
    return Math.floor((stats * 2 + Math.floor(stats / 100) + level) / 4) + level + 5;
}
