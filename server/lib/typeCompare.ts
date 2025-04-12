export const typeCompare = (type1:string,type2:string):number => {
    // タイプ相性表
    const typeChart: {[key: string]: {[key: string]: number}} = {
        normal: { rock: 0.5, ghost: 0, steel: 0.5 },
        fighting: { normal: 1, rock: 1, steel: 1, ice: 1, dark: 1, fairy: 0.5 },
        flying: { fighting: 1, bug: 1, grass: 1, electric: 0.5, rock: 0.5 },
        poison: { grass: 1, fairy: 1, bug: 1, ground: 0.5 },
        ground: { rock: 1, electric: 1, poison: 1, steel: 1 },
        rock: { fire: 1, flying: 1, bug: 1, ice: 1 },
        bug: { grass: 1, psychic: 1, dark: 1 },
        ghost: { ghost: 1, psychic: 1 },
        steel: { fairy: 1 },
        fire: { bug: 1, steel: 1 },
        water: { fire: 1, ground: 1 },
        grass:{ water : 2},
        electric:{water :2},
        ice:{grass :2},
        psychic:{fighting :2},
        fairy:{fighting :2}
    };

    // タイプ相性を取得
    const effectiveness = typeChart[type2]?.[type1] | 1;

    return effectiveness;
}