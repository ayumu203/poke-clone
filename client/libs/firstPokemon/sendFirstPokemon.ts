export const send_first_pokemon = async(player_id:string,pokemon_id:number) =>{
    const base_url = process.env.NEXT_PUBLIC_API_URL;
    const url = `${base_url}/first-pokemon/register`;
    try {
        const response = await fetch(url,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({player_id:player_id,pokemon_id:pokemon_id}),
        });
        if (!response.ok) {
            throw new Error('response error');
        }
        const data = await response.json();
        return data;
    } catch(error){
        console.error(error);
        throw error;
    }
}