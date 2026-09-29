import { ConflictError, ConstraintError, NotFoundError } from "../errors/AppError.js"

export function createApartmentRepository(prisma){
    return {
        async getApartment(apartmentId){
            return await prisma.apartment.findUnique({ 
                where: { id: apartmentId },
                include: { 
                    building: { select: { adminId: true }},
                    owner: { select: { name: true }},
                    bills: {
                        orderBy: { createdAt: 'desc' },
                        include:{
                            expenseReport: { select: { 
                                id: true,
                                description: true,
                            }}
                        }
                    }
                }
            })
        },

        async getApartmentsByBuilding(buildingId){
            return await prisma.apartment.findMany({ 
                where: { buildingId },
                include: { 
                    building: { select: {strAddress: true, strNum: true }},
                    owner: { select: { name: true }}
                },
                orderBy: { doorNum: 'asc' },
            })
        },

        async getApartmentsByOwnerId(ownerId){
            return await prisma.apartment.findMany({ 
                where: { ownerId },
                include: { building: { select: {strAddress: true, strNum: true}}}
            })
        },

        async createApartment(data){
            try{
                return await prisma.apartment.create({ data })
            }catch(err){
                if (err.code === 'P2002'){
                    throw new ConflictError('Unique(Building, floor, doorNum)')
                }
                throw err
            }
        },

        async updateApartment(data, apartmentId){
            try{
                const apartment = await prisma.apartment.update({
                    where: { id: apartmentId },
                    data
                })
                return apartment;
            }catch(err){
                throw err
            }
        },

        async claimApartment(code, authId){
            try{
                await prisma.apartment.update({
                    where:{ inviteCode: code },
                    data:{
                        ownerId: authId,
                        inviteCode: null
                    }
                })
            }catch(err){
                if(err.code === 'P2025'){
                    throw new NotFoundError('The apartment was not found')
                }
            }
        },

        async deleteApartment(aptId){
            try{
                await prisma.apartment.delete({ where: {id: aptId}})
            }catch(err){
                if(err === 'P2025'){
                    throw new NotFoundError('Apartment not found')
                }
                if(err === 'P2003' || err === 'P2014'){
                    throw new ConstraintError('This Apartment is essential for other entities')
                }
                throw err
            }
        } 
    }
}