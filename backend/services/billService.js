import { ForbiddenError, NotFoundError } from "../errors/AppError.js"

export function createBillService(billRepository, apartmentRepository){
    return{
        async getBill(bid, authId){
            const bill = await billRepository.getBill(bid)
            
            if(!bill){
                throw new NotFoundError("The requested bill was not found.")
            }

            let accessLevel = 'none';
            if (bill.apt.building.adminId === userId) accessLevel = 'admin';
            if (bill.apt.ownerId === userId) accessLevel = 'owner';

            if (accessLevel === 'none'){
                throw new ForbiddenError('User has no access to this resource')
            }

            return {
                ...bill,
                accessLevel
            }
        },

        async getBillsByApartment(aid, authId){ //Owner and Admin only 
            const apartment = await apartmentRepository.getApartment(aid);
            if(!apartment){
                throw new NotFoundError('Apartment was not found.')
            }
            let accessLevel = 'none';
            if (apartment.building.adminId === authId) accessLevel = 'admin';
            if (apartment.ownerId === authId) accessLevel = 'owner';

            if(accessLevel === 'none'){
                throw new ForbiddenError('User does not have Permission to access that resource');
            }

            const bills = await billRepository.getBillsByApartment(aid)
            return {
                bills, 
                accessLevel
            }
        }
    }
}