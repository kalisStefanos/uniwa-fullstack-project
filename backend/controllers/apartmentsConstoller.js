import { error } from 'node:console';
import prisma from '../db.js';

export const createApt = async (req, res) => {
    const id = req.body.id;
    const bid = parseInt(req.body.buildingId);
    const f1 = parseFloat(req.body.f1);
    const floor = parseInt(req.body.floor);

    try{
        const apt = await prisma.apartment.create({
            data: {
                id: id,
                buildingId: bid,
                f1: f1,
                floor: floor
            }
        })
        res.status(201).json({
            msg: 'Succesfully created apt!',
            apt: {
                id: apt.id,
                buildingId: apt.buildingId,
                f1: apt.f1,
                floor: apt.floor,
                owner: apt.ownerId //should be null
            }
        })
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
};

export const deleteApt = (req, res) => {

    res.status(200).json();
}