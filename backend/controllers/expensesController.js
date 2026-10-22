import { error } from 'node:console';
import {prisma} from '../prismaClient.js';

export function createExpenseController(expenseService){
    return{
        async getExpense(req, res, next){
            try{
                const expense = await expenseService.getExpense(req.params.id, req.user.id)
                res.status(200).json(expense)
            }catch(err){
                next(err)
            }
        },

        async getExpenses(req, res, next){
            try{
                const expenses = await expenseService.getExpenses(req.params.bid, req.user.id)
                res.status(200).json(expenses);
            }catch(err){
                next(err)
            }
        },

        async createExpense(req, res, next){
            try{
                const input = {
                    amount : parseFloat(req.body.amount),
                    categoryId: parseInt(req.body.categoryId),
                    description: req.body.description
                }
                const expense = await expenseService.createExpense(req.params.bid, input, req.user.id)
                res.status(201).json(expense);
            }catch(err){
                next(err)
            }
        },
    }
}