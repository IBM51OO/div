class UserRepository
{
    async getUserScore()
    {
        const { data, error } = await useAsyncData('userScore', () => $fetch('/api/userScore', 
        { 
            method: 'GET',
        }))
        if(error)
            console.log(error.value);
            
        return data
    }
}
export default UserRepository