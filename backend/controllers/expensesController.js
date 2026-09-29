import { error } from 'node:console';
import {prisma} from '../prismaClient.js';

export const getExpenses = async (req, res, next) =>{
    const buildingId = req.params.id;
    const building = await prisma.building.findFirst({
        where: {
            id: buildingId
        }
    })

    if(!building){
        return res.status(400).json({ error: 'Building not Found'})
    }

    if(building.adminId !== req.user.id){
        return res.status(403).json({ error: 'User has no permission to that resource'})
    }

    try{
        const expenses = await prisma.expense.findMany({
            where:{
                buildingId: buildingId
            },
            include: {
                category: true
            },
            orderBy: {
                issuedAt: 'desc',
            }
        })
        return res.status(200).json(expenses)
    }catch(error){
        return res.status(500).json({error: 'Internal Server Error'})
    }
}

export const createExpense = async (req, res) => {
    const bid = req.params.id;
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

export const deleteExpense = async (req, res) => {

    res.status(200).json();
}

export const getExpenseCats = async (req, res, next) => {
    const id = req.params.id;

    const building = await prisma.building.findFirst({
        where:{
            id
        }
    })

    if(!building){
        return res.status(400).json({ error : 'Building not Found'})
    }

    if(req.user.id !== building.adminId){
        return res.status(403).json({ error : 'User has no permission to that resource'})
    }

    try{
        const cats = await prisma.expenseCategory.findMany({
            where: {
                buildingId: id
            }
        })
        return res.status(200).json(cats)
    }catch(error){
       
    }
}

export const postExpenseCat = async (req, res, next) => {
    const buildingId = req.params.id;
    
    const {name, areaWeight, floorWeight} = req.body;

    const building = await prisma.building.findFirst({
        where:{
            id: buildingId,
        }
    })

    if(!building){
        return res.status(400).json({ error : 'Building not Found'})
    }

    if(req.user.id !== building.adminId){
        return res.status(403).json({ error : 'User has no permission to that resource'})
    }

    try{
        const cat = await prisma.expenseCategory.create({
            data: {
                name,
                areaWeight,
                floorWeight,
                buildingId
            }
        })

        return res.status(201).json({ msg: 'Expense Category Created'})
    }catch(error){
        if(error.code === 'P2002'){
            return res.status(409).json({error: 'A Category with this name already exists for this building'});
        }
    }
}

export const createReport = async (req, res, next) => {
    const buildingId = req.params.id;
    const {expenseIds, description} = req.body

    try{
        // get apartments 
        const apts = await prisma.apartment.findMany({
            where: {
                buildingId: buildingId
            }
        });
        // get filtered expenses
        const expenses = await prisma.expense.findMany({
            where: {
                id: {
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
        
        const report = await prisma.expenseReport.create({
            data: {
                buildingId,
                description
            }
        });
        console.log(report.id)
        const updatedExpenses = await prisma.expense.updateMany({
            where: {
                id: {
                    in: expenseIds
                }
            },
            data: {
                expenseReportId: report.id
            }
        })

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
        console.error(error)
        res.status(500).json({error: "Internal Server Error"})
    }
} 

export const getReports = async (req, res, next) => {
    const id = req.params.id;

    try{
        const building = await prisma.building.findFirst({
            where: {
                id
            }
        })
    
        if(!building){
            return res.status(404).json({error: 'Building not Found'})
        }
    
        if(building.adminId !== req.user.id){
            return res.status(403).json({error: 'User has no permission to access the resource'})
        }
    
        const reports = await prisma.expenseReport.findMany({
            where: {
                buildingId: id
            }
        })
        return res.status(200).json(reports)
    }catch(error){
        console.log(error)
    }

}