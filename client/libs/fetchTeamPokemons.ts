export const fetch_team_pokemon = async(id:string) =>{
    const url = `http://localhost:3001/data/team-pokemon`;
    try {
        const response = await fetch(url,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({id:id}),
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