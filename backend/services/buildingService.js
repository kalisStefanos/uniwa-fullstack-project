import { ForbiddenError } from "../errors/AppError.js";

export function createBuildingService(buildingRepository) {
    return {
        async getBuilding(buildingId, authId){
            const building = await buildingRepository.getBuilding(buildingId);

            if(!building){
                throw new NotFoundError('Building not found');
            }
            if(building.adminId !== authId){
                throw new ForbiddenError('Cannot get Building because User is not the Admin')
            }
            return building;
        },

        async getBuildings(authId){
            return await buildingRepository.getBuildings(authId);
        },

        async createBuilding(input, authId){
            const buildingData = {
                ...input, 
                adminId: authId
            } 
            return await buildingRepository.createBuilding(buildingData);    
        },

    }

}
