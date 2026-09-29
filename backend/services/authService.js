import bcrypt from 'bcryptjs';
import generateToken from '../utils/tokenGenerator.js';
import { UnauthorizedError } from '../errors/AppError.js';

export function createAuthService(userRepository){
    return{
        async register(name, pass){
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(pass, salt);        
            return await userRepository.createUser(name, hashedPass);
        },

        async login(name, pass){
            const user = await userRepository.getUserByName(name);
            if(!user){
                throw new UnauthorizedError('Invalid username/password combination');
            }
            if(!await bcrypt.compare(pass, user.pass)){
                throw new UnauthorizedError('Invalid username/password combination');
            }
            return generateToken(user.id);
        },
    }
}