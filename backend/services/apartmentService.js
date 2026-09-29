import { ForbiddenError, NotFoundError } from "../errors/AppError.js"
import { codeGenerator } from '../utils/codeGenerator.js';

export function createApartmentService(apartmentRepository, buildingRepository){
    return {
        async getApartment(apartmentId, authId){
            return await apartmentRepository.getApartment(apartmentId)
            //add permissions
        },

        async getApartmentsByBuilding(buildingId, authId){
            return await apartmentRepository.getApartmentsByBuilding(buildingId)
            //add permissions
        },

        async getMyApartments(ownerId){
            return await apartmentRepository.getApartmentsByOwnerId(ownerId)  
        },

        async createApartment(input, buildingId, authId){
            const building = await buildingRepository.getBuilding(buildingId)
            if(!building){
                throw new NotFoundError('Trying to add an apartment to a building that doesn\'t exist')
            }
            if(building.adminId !== authId){
                throw new ForbiddenError('User is not the Admin and therefore cannot add any Apartments')
            }

            const data = {
                ...input,
                buildingId
            }
            return await apartmentRepository.createApartment(data)
        },

        async updateApartment(input, apartmentId, authId){
            const apartment = await apartmentRepository.getApartment(apartmentId);
            if(!apartment){
                throw new NotFoundError('Apartment Not Found')
            }
            if(apartment.building.adminId !== authId){
                throw new ForbiddenError('User is not the Admin');
            }
            return await apartmentRepository.updateApartment(input, apartmentId)
        },

        async generateClaimCode(apartmentId, authId){
            const apartment = await apartmentRepository.getApartment(apartmentId);
            if(!apartment){
                throw new NotFoundError('Apartment was not found')
            }
            if(apartment.building.adminId !== authId){
                throw new ForbiddenError('Only the Admin can generate a code')
            }
            const code = await codeGenerator();
            const data = { inviteCode: code }
            await apartmentRepository.updateApartment(data, apartmentId)
            return code;
        },

        async claimApartment(code, authId){
            return await apartmentRepository.claimApartment(code, authId)
        },

        async deleteApartment(aptId, authId){
            const apartment = await apartmentRepository.getApartment(aptId);
            if(!apartment){
                throw new NotFoundError('Apartment not Found.');
            }
            if(apartment.building.adminId !== authId){
                throw new ForbiddenError('User is not the Admin');
            }
            return await apartmentRepository.deleteApartment(aptId);
        }

    }
}