export function createExpenseCatService(expenseRepository){
    return{
        async getExpenseCategories(bid, authId){
            return expenseRepository.getExpenseCategories(bid);
        },

        async createExpenseCategory(bid, input, authId){
            const data = {
                buildingId: bid,
                ...input
            }
            return expenseRepository.createExpenseCategory(data);
        }
    }
}