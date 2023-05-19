import UserScoreRemote from "~/models/api/UserScoreRemote";

class UserRepository
{
    async getUserScore(): Promise<UserScoreRemote | null>
    {
        const { data, error } = await useAsyncData('userScore', () => $fetch('/api/userScore', 
        { 
            method: 'GET',
        }))
        if(error)
            console.log(error.value);
            
        return data.value
    }
}
export default UserRepository