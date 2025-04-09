export const fetch_team_move = async(id:string) =>{
    const base_url = process.env.NEXT_PUBLIC_API_URL;
    const url = `${base_url}/data/team-move`;
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