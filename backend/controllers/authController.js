import prisma from '../db.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/tokenGenerator.js';

// REGISTER
export const register = async (req, res) => {
    try{
        const { username, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                name: username,
                pass: hashedPass
            }
        })

        res.status(201).json({
            msg: "User Created",
            //user: { id: user.id, name: user.name }
            user: user
        });
        //res.json();
    } catch(error){
        if(error.code === 'P2002'){
            return res
            .status(409)
            .json({error: "A user with this name already exists"});
        }
        console.error('Registration Error: ', error);
        return res
        .status(500)
        .json({error: 'Internal server error!'});
    }
};

//LOGIN
export const login = async (req, res) => {
    const { username, password } = req.body;

    try{
        const user = await prisma.user.findUnique({
            where: {
                name: username
            }
        })

        if(user){
            const isMatch = await bcrypt.compare(password, user.pass);

            if(!isMatch){
                return res.status(401).json({ error: 'Invalid username/password combination'});
            }
        } else {
            return res.status(401).json({ error: 'Invalid username/password combination'});
        }

        const token = generateToken(user.id, res);

        res.status(200).json({
            status: "Success",
            data:{
                token: token
            }
        });

    }catch(error){
        console.error("Error logging in:", error);
        res.status(500).json({ msg: 'Internal Server Error'});
    }
}

// ===== DELETE USER =====

export const deleteUser = async (req, res) => {

    const id = parseInt(req.params.id);
    if(Number.isNaN(id)){
        return res
        .status(400)
        .json({error: 'Id must be a valid integer'});
    }

    try{
        await prisma.user.delete({
            where:{
                id: id
            }
        })
        res
        .status(200)
        .json({msg: 'User deleted Succesfully'});

    } catch(error){
        if(error.code === 'P2025'){
            return res
                .status(404)
                .json({error: `User with id = ${id} was not found`});
        }
        console.error('User deletion error:', error);
        return res
            .status(500)
            .json({error: 'Internal server error'});
    }
}

export const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({
        msg: "Logged Out successfully",
    })
}
