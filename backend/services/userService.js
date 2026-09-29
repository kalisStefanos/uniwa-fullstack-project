
export function createUserService(userRepository){
    return{
        async getUser(userId){
            return await userRepository.getUser(userId);
        }
    }
}