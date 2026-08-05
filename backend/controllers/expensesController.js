import { error } from 'node:console';
import prisma from '../db.js';

export const createExpense = async (req, res) => {
    const bid = parseInt(req.body.buildingId);
    const amount = parseFloat(req.body.amount);
    const cid = parseInt(req.body.categoryId);
    const desc = req.body.description;

    try{
        const expense = await prisma.expense.create({
            data: {
                buildingId: bid,
                amount: amount,
                categoryId: cid,
                description: desc
            }
        })
        res.status(201).json({
            msg: 'Succesfully created a new expense!',
            expense: {
                id: expense.id,
                bid: expense.buildingId,
                amount: expense.amount,
            }
        })
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    }
};

export const deleteExpense = (req, res) => {

    res.status(200).json();
}