
export function createAuthController(authService){
    return{
        async verify(req, res, next){
            try{
                res.status(200).json({ 
                    msg: 'Already Logged In', 
                    user: {
                        id: req.user.id, 
                        name: req.user.name,
                    } 
                });
            } catch(err){
                next(err);
            }
            
        },

        async register(req, res, next){
            try{
                const { name, pass } = req.body;
                const user = await authService.register(name, pass);
                res.status(201).json({ 
                    msg: 'Registered Succesfully',
                    username: user.name
                })
            }catch(err){
                next(err)
            }
        },

        async login(req, res, next){
            try{
                const { name, pass } = req.body;
                const token = await authService.login(name, pass);
                
                res.cookie("jwt", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 1000 * 60 * 60 * 24 * 7 
                }); 

                res.status(200).json({ msg: 'Logged in Successfully'});
            }catch(err){
                next(err)
            }
        },

        async logout(req, res){
            res.cookie("jwt", "", {
                httpOnly: true,
                expires: new Date(0)
            });
            res.status(200).json({
                msg: "Logged Out successfully",
            })
        },
    }
}