import { prisma } from '../prismaClient.js';

export function createBuildingController(buildingService){
    return {
        // POST BUILDING
        async createBuilding(req, res, next){
            try {
                const {floors, strAddress, strNum} = req.body;

                const input = {
                    floors: parseInt(floors, 10),
                    strAddress,
                    strNum: parseInt(strNum, 10)
                }

                const building = await buildingService.createBuilding(input, req.user.id);
                res.status(201).json(building);
            } catch(err){
                next(err);
            }
        },

        async getBuildings(req, res, next){
            try{
                const buildings = await buildingService.getBuildings(req.user.id)
                res.status(200).json(buildings);
            }catch(err){
                next(err);
            }
        },
        
        async getBuilding(req, res, next){
            const id = req.params.id;
            try{
                const building = await buildingService.getBuilding(id, req.user.id);
                res.status(200).json(building);
            }
            catch(err){
                console.error(err);
                next(err);
            }
        },
    };
}




export const getBuildingApartments = async (req, res, next) => {
    try{
        const apts = await prisma.apartment.findMany({
            where: {
                buildingId: req.params.id,
                building: {
                    adminId: req.user.id
                }
            },
            include: {
                owner: true
            },
            orderBy: {
                doorNum: 'asc',
            },
        });
        //console.log(apts);
        res.status(200).json(apts);
    }catch(error){

    }
}

export const getBuildingApartment = async (req, res, next) => {
    const aid = req.params.aid;
    try{
        const apt = await prisma.apartment.findUnique({
            where: {
                id: aid,
                building: {
                    adminId: req.user.id
                },            
            },
            include: {
                owner: true
            }
        });
        if(!apt){
            return res.status(404).json({error: 'Apartment not found'});
        }
        res.status(200).json(apt);
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
}

export const postBuildingApartment = async (req, res, next) => {
    const {area, doorNum, floor, buildingId} = req.body;

    const building = await prisma.building.findUnique({
        where: {
            id: buildingId,
        }
    })

    if(building.floors < floor){
        return res.status(400).json({error: 'Floor number exceeds the number of floors in the building'});
    }

    try{
        const apt = await prisma.apartment.create({
            data: {
                area: area,
                doorNum: doorNum,
                floor: floor,
                buildingId: buildingId
            }
        })

        res.status(201).json({msg: "Apt created"})

    }catch(error){
        if(error.code === 'P2002'){
            return res.status(409).json({error: 'An apartment with this door number already exists in this floor'});
        }

        console.log(error);
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const putBuildingApartment = async (req, res, next) => {
    const aid = req.params.aid;
    const {area, doorNum, floor, ownerId} = req.body;
    const invCode = await codeGenerator();

    try{
        const apt = await prisma.apartment.update({
            where: {
                id: aid,
                building: {
                    adminId: req.user.id
                }
            },
            data:{
                area: area,
                doorNum: doorNum,
                floor: floor,
                ownerId: ownerId,
                inviteCode: invCode
            }
        })

        res.status(200).json({inviteCode: invCode});

    }catch(error){
        if(error.code === 'P2002'){
            return res.status(409).json({error: 'An apartment with this door number already exists in this floor'});
        }
        res.status(500).json({error: 'Internal server error'});
    }
}
