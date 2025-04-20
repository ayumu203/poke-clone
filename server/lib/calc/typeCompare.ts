export const typeCompare = (type1:string,type2:string):number => {
    // タイプ相性表
    // オブジェクトの定義方法は{[key:string]:valueの型}
    const typeChart: { [key: string]: { [key: string]: number } } = {
        normal: { rock: 0.5, ghost: 0, steel: 0.5 },
        fighting: { normal: 2, flying: 0.5, poison: 0.5, rock: 2, bug: 0.5, steel: 2, psychic: 0.5, ice: 2, dark: 2 },
        flying: { fighting: 2, rock: 0.5, bug: 2, steel: 0.5, grass: 2, electric: 0.5 },
        poison: { poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, grass: 2},
        ground: { flying: 0, poison: 2, rock: 2, bug: 0.5, steel: 2, fire: 2, grass: 0.5, electric: 2 },
        rock: { fighting: 0.5, flying: 2, ground: 0.5, bug: 2, steel: 0.5, fire: 2, ice: 2 },
        bug: { fighting: 0.5, flying: 0.5, poison: 0.5, ghost: 0.5, steel: 0.5, fire: 0.5, grass: 2, psychic: 2, dark: 2 },
        ghost: { normal: 0, ghost: 2, psychic: 2, dark: 0.5 },
        steel: { rock: 2, steel: 0.5, fire: 0.5, water: 0.5, electric: 0.5, ice: 2},
        fire: { rock: 0.5, bug: 2, steel: 2, fire: 0.5, water: 0.5, grass: 2, ice: 2, dragon: 0.5 },
        water: { ground: 2, rock: 2, fire: 2, water: 0.5, grass: 0.5, dragon: 0.5 },
        grass: { flying: 0.5, poison: 0.5, ground: 2, rock: 2, bug: 0.5, steel: 0.5, fire: 0.5, water: 2, grass: 0.5, dragon: 0.5 },
        electric: { flying: 2, ground: 0, water: 2, grass: 0.5, electric: 0.5, dragon: 0.5 },
        psychic: { fighting: 2, poison: 2, steel: 0.5, psychic: 0.5, dark: 0 },
        ice: { flying: 2, ground: 2, steel: 0.5, fire: 0.5, water: 0.5, grass: 2, ice: 0.5, dragon: 2 },
        dragon: { steel: 0.5, dragon: 2 },
        dark: { fighting: 0.5, ghost: 2, psychic: 2, dark: 0.5 },
      };
    // タイプ相性を取得
    const effectiveness = typeChart[type2]?.[type1] | 1;

    return effectiveness;
}