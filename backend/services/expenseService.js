import { ForbiddenError, NotFoundError } from "../errors/AppError.js";

export function createExpenseService(expenseRepository, buildingRepository){
    return{
        async getExpense(expenseId, authId){
            return await expenseRepository.getExpense(expenseId);
        },
        
        async getExpenses(bid, authId){
            return await expenseRepository.getExpenses(bid);
        },

        async createExpense(bid, input, authId){
            const data = {
                buildingId: bid,
                ...input
            }

            const building = await buildingRepository.getBuilding(bid);
            if(!building){
                throw new NotFoundError('Building wan not found.')
            }

            if(building.adminId !== authId){
                throw new ForbiddenError('The user in not an Admin.')
            }

            return await expenseRepository.createExpense(data);    
        }
    }
}