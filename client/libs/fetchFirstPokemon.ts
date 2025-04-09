export const fetch_first_option = async() =>{
    const base_url = process.env.NEXT_PUBLIC_API_URL;
    const url = `${base_url}/first-pokemon-option`;
    try {
        const response = await fetch(url,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
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