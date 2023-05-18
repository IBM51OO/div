import UserRepository from "@/api/repositories/userRepository";
function createRepositories()
{
    return {
        userRepository: new UserRepository()
    };
}

const api = createRepositories();

export default api;