import { Pokemon } from "../../../types/pokemon.types";

// 外部APIから必要データを取得するAPI
// マスタデータの変更で使用し、ユーザの使用範囲では使われない.
// ステータス取得用
const fetchBaseStat = async (url: string, headers: HeadersInit,pokemon_id:number): Promise<Pokemon> => {
    const response = await fetch(url);
    if (!response.ok) {
    throw new Error('response error');
    }
    const data: any = await response.json();
    const pokemon:Pokemon = {
        pokemon_id:pokemon_id,
        name:"none",
        type:data.types[0].type.name,
        front_image:data.sprites.versions['generation-v']['black-white'].animated.front_default,
        back_image:data.sprites.versions['generation-v']['black-white'].animated.back_default,
        base_hp:data.stats[0].base_stat,
        base_attack:data.stats[1].base_stat,
        base_defence:data.stats[2].base_stat,
        base_special_attack:data.stats[3].base_stat,
        base_special_defence:data.stats[4].base_stat,
        base_speed:data.stats[5].base_stat,
        evolve_level:-1,
        move_list:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    };
    return pokemon;
};

// 日本語名取得
const fetchName = async (url: string, headers: HeadersInit,pokemon_id:number): Promise<string> => {
    const response = await fetch(url);
    if (!response.ok) {
    throw new Error('response error');
    }
    const data: any = await response.json();
    const name:string = data.names[0].name;
    return name;
};

export const fetchPokemonName = async(pokemon_id:number): Promise<string> =>{
    const name_url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon_id}`;
    const headers = {
    'Content-Type': 'application/json',
    };
    const name:string = await fetchName(name_url,headers,pokemon_id);
    try {
        return name;
    }   catch(error){
        throw error;
    }
}

export const fetchPokemonInfo = async(pokemon_id:number): Promise<Pokemon> => {
    const base_status_url = `https://pokeapi.co/api/v2/pokemon/${pokemon_id}`;
    const name_url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon_id}`;
    const headers = {
    'Content-Type': 'application/json',
    };

    try{
        const pokemon = await fetchBaseStat(base_status_url,headers,pokemon_id);
        return pokemon;
    } catch(error){
        console.error('Error fetching Pokémon data:', error);
        throw error;
    }
}

