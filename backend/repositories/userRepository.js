import { ConflictError } from "../errors/AppError.js"

export function createUserRepository(prisma){
    return{
        async getUser(userId){
            return await prisma.user.findUnique({ where: { id: userId }})
        },

        async getUserByName(name){
            return await prisma.user.findFirst({ where: { name }})
        },

        async createUser(name, pass){
            try{
                return await prisma.user.create({ data:{ name, pass }})
            }catch(err){
                if(err.code === 'P2002'){
                    throw new ConflictError('A user with such name already exists.');
                }
                throw err;
            }
        },


    }


}