import prisma from '../db.js';

export const createReport = async (req, res, next) => {
    const buildingId = req.body.buildingId;
    const {expenseIds} = req.body.expenseIds
    try{
        const apts = await prisma.apartment.findMany({
            where: {
                buildingId: buildingId
            }
        });
        const expenses = await prisma.expense.findMany({
            where: {
                id:{
                    in: expenseIds
                }
            }
        })

        for(const apt of apts){
            apt.share = 0;
        }
        
        for(const expense of expenses){
            const cat = await prisma.expenseCategory.findUnique({
                where:{
                    buildingId: buildingId,
                    id: expense.categoryId
                }
            })

            let totalScore = 0;
            for(const apt of apts){
                apt.score = (cat.areaWeight * apt.area) + (cat.floorWeight * apt.floor);
                totalScore += apt.score
            }
            for(const apt of apts){
                apt.share += expense.amount * (apt.score/totalScore);
            }
        }
        
        const report = await prisma.expenseReport.create();

        for(const apt of apts){
            const bill = await prisma.bill.create({
                data:{
                    aptId: apt.id,
                    amount: apt.share,
                    expenseReportId: report.id
                }
            })
        }
        res.status(201).json({msg: 'Report Created'});

    } catch(error){
        res.status(500).json({error: "Internal Server Error"})
        console.error(error);
    }
};