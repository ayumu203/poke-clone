export const send_first_pokemon = async(player_id:string,pokemon_id:number) =>{
    const url = `http://localhost:3001/first-pokemon-determination`;
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