
export function createApartmentController(apartmentService){
    return {
        async getApartment(req, res, next){
            try{
                const apartment = await apartmentService.getApartment(req.params.aid, req.user.id);
                res.status(200).json(apartment);
            }catch(err){
                next(err)
            }
        },

        async getApartmentsByBuilding(req, res, next){
            try{ 
                const apartments = await apartmentService.getApartmentsByBuilding(req.params.bid, req.user.id);
                res.status(200).json(apartments);
            }catch(err){
                next(err)
            }
        },

        async getMyApartments(req, res, next){
            try{ 
                const apartments = await apartmentService.getMyApartments(req.user.id);
                res.status(200).json(apartments);
            }catch(err){
                next(err)
            }
        },

        async createApartment(req, res, next){
            try{
                const {floor, doorNum, area} = req.body;
                const input = {
                    floor: parseInt(floor, 10),
                    doorNum: parseInt(doorNum, 10),
                    area: parseInt(area, 10)
                }
                const apartment = await apartmentService.createApartment(input, req.params.bid, req.user.id)
                res.status(201).json(apartment)
                
            }catch(err){
                next(err)
            }
        },

        async updateApartment(req, res, next){
            try{
                const apartmentId = req.params.aid;
                const authId = req.user.id
                const { area, doorNum, floor } = req.body;
                const input = { area, doorNum, floor };
                await apartmentService.updateApartment(input, apartmentId, authId);
                res.status(204).end();
            }catch(err){
                next(err);
            }
        },

        async generateClaimCode(req, res, next){
            try{
                const apartmentId = req.params.aid;
                const userId = req.user.id;

                const code = await apartmentService.generateClaimCode(apartmentId, userId)

                res.status(200).json({ claimCode: code });

            }catch(err){
                next(err)
            }
        },

        async claimApartment(req, res, next) {
            try{
                const code = req.body.claimCode.trim().toUpperCase();
                await apartmentService.claimApartment(code, req.user.id)
                res.status(200).json();
            }catch(err){
                next(err)
            }
        },
        
        async deleteApartment(req, res, next){
            try{
                await apartmentService.deleteApartment(req.params.aid, req.user.id)
                res.status(200).json({msg: 'Delete Succesfully'})
            }catch(err){
                next(err)
            }
        },
    }
}