export const getAccountInfo = async (code: string) => {
    const response = await fetch(`https://discord.com/api/users/@me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${code}`
        }
    });    
    const data = await response.json();
    return data;
}