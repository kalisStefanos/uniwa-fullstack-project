export function createReportRepository(prisma){
    return{
        async getReport(rid){
            return await prisma.expenseReport.findFirst({
                where: { id: rid },
                include: {
                    building: {
                        select: { 
                            //id: true,
                            adminId: true
                        }
                    }
                }
            })
        },

        async getReports(bid){
            return await prisma.expenseReport.findMany({
                where:{
                    buildingId: bid
                }
            })
        }, 

        async createReport(buildingId, description, expenseIds, shares){
            return prisma.$transaction(async (tx) => {
                const report = await tx.expenseReport.create({
                    data: { buildingId, description },
                });

                await tx.expense.updateMany({
                    where: { id: { in: expenseIds } },
                    data: { expenseReportId: report.id },
                });

                await tx.bill.createMany({
                    data: shares.map(s => ({
                        aptId: s.aptId,
                        amount: s.amount,
                        expenseReportId: report.id,
                    })),
                });
                return report;
            });
        },
    }
}