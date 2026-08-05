import prisma from '../db.js';

export const getBuildings = (req, res) => {
    res.json(buildings);
};

export const getBuilding = (req, res) => {
    const id = parseInt(req.params.id);
    const obj = buildings.find(o => o.id === id);
    if (obj) {
        return res.status(200).json(obj);
    }
    res.status(404).json({ error: `Object with id ${id} not found` });
};

export const postBuilding = async (req, res) => {
    const adminId = parseInt(req.body.adminId);
    const floors = parseInt(req.body.floors);
    const strAddr = req.body.strAddress;
    const strNum = parseInt(req.body.strNum);

    try {
        const building = await prisma.building.create({
            data: {
                adminId: adminId,
                floors: floors,
                strAddress: strAddr,
                strNum: strNum
            }
        })
        res.status(201).json({
            msg: 'Created new building',
            building: {
                bid: building.id
            }
        });
    } catch(error){
        console.error(error)
        res.status(500).json({error: 'Internal server error'});
    }
}