import prisma from "../db.js";

export const createCategory = async (req, res, next) => {
    const {name, buildingId, areaWeight, floorWeight} = req.body;

    try{
        const cat = await prisma.expenseCategory.create({
            data: {
                areaWeight: areaWeight,
                floorWeight: floorWeight,
                buildingId: buildingId,
                name: name
            }
        })

        res.status(201).json({msg: `Created new expense category '${name}'`});

    }catch(error){
        console.error("Error while creating expense Category");
        res.status(500).json({error: "Internal Server Error"});
    }
}