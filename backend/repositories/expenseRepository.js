export function createExpenseRepository(prisma){
    return{
        async getExpense(id){
            return await prisma.expense.findUnique({ where: { id }})
        },

        async getExpenses(bid){
            return await prisma.expense.findMany({ 
                where: { buildingId: bid },
                include: { category: true },
                orderBy: { issuedAt: 'desc',}
            })
        },

        async getExpensesByIds(ids){
            return await prisma.expense.findMany({ where: {id: {in: ids}}})
        },

        async createExpense(data){
            try{
                const expense = await prisma.expense.create({ data })
            }catch(err){
                throw err;
            }
        },

        async markExpensesReported(expenseIds, reportId, tx = prisma) {
            return tx.expense.updateMany({
                where: { id: { in: expenseIds } },
                data: { expenseReportId: reportId },
            });
        },
    }
}