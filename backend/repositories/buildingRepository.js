import { ConflictError } from "../errors/AppError.js";

export function createBuildingRepository(prisma) {
    return {   
        async getBuilding(buildingId){
            return await prisma.building.findUnique({ where: { id: buildingId }})
        },
        
        async getBuildings(authId){
            try{
                return await prisma.building.findMany({
                    where: {
                        adminId: authId
                    },
                    include: {
                        _count: {
                            select: {
                                apartments: true
                            }
                        }
                    }
                })
            }catch(err){
                throw err
            }
        },
        
        async createBuilding(data){
            try {
                return await prisma.building.create({data});
            }catch(err){
                if(err.code === 'P2002'){
                    throw new ConflictError('A Building with this Address already exists.');
                }
                throw err;
            }
        },

    }
}
