import { describe } from "node:test";

export function createBillRepository(prisma){
    return{
        async getBill(bid){
            const bill = await prisma.bill.findUnique({ 
                where: { id: bid },
                include: {
                    expenseReport: { select: {
                        id: true, 
                        description: true
                    }},
                    apt: { select: {
                        ownerId: true,
                        building: { select:{
                            adminId: true
                        }
                    }},
                }
        }})
            return bill;
        },
        
        async getBillsByReportId(repId){
            const bills = await prisma.bill.findUnique({ 
                where: { id: bid },
                include: {
                    expenseReport: { select: {
                        id: true, 
                        description: true
                    }},
                    apt: { select: {
                        ownerId: true,
                        building: { select:{ adminId: true }}},
                    }
            }})
            return bills;
        },

        async getBillsByApartment(aid){
            const bills = await prisma.bill.findMany({ 
                where: { aptId: aid },
                include: {
                    apt: { select: { buildingId : true}},
                    expenseReport: { select: {
                            description: true
                        }}
            }})
            return bills; 
        }
    }
}