import { NotFoundError } from "../errors/AppError.js"

export function createUserController(userService){
    return{
        async getUser(req, res, next){
            try{
                const user = await userService.getUser(req.params.uid)
                if(!user){
                    throw new NotFoundError('User was not found.')
                }
                console.log(user)
                res.status(200).json(user)
            }catch(err){
                next(err)
            }
        }
    }
}