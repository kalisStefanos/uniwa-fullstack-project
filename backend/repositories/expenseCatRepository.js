export function createExpenseCatRepository(prisma){
    return{
        async getExpenseCategories(bid){
            return await prisma.expenseCategory.findMany({ where: { buildingId: bid }})
        },

        async getExpenseCategoriesByIds(ids){
            return await prisma.expenseCategory.findMany({ where: { id: { in: ids}}})
        },

        async createExpenseCategory(data){
            return await prisma.expenseCategory.create({data})
        },
    }
}