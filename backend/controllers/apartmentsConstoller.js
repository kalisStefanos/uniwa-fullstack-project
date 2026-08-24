import { error } from 'node:console';
import prisma from '../db.js';

export const createApt = async (req, res, next) => {
    const bid = req.body.buildingId;
    const area = parseInt(req.body.area);
    const floor = parseInt(req.body.floor);
    const doorNum = parseInt(req.body.doorNum);

    try{
        const apt = await prisma.apartment.create({
            data: {
                buildingId: bid,
                area: area,
                floor: floor,
                doorNum: doorNum
            }
        })
        res.status(201).json({
            msg: 'Succesfully created apt!',
            apt: {
                id: apt.id,
                buildingId: apt.buildingId,
                f1: apt.f1,
                f2: apt.f2,
                floor: apt.floor,
                doorNum: apt.doorNum,
                owner: apt.ownerId //should be null
            },
            createdBy:{
                id: req.user.id,
                name: req.user.name
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