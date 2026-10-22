import { ForbiddenError, NotFoundError } from "../errors/AppError.js";
import { calculateApartmentShares } from "./reportCalculator.js";

export function createReportService({reportRepository, apartmentRepository, buildingRepository, expenseRepository, expenseCatRepository}){
    return{
        async getReport(rid, authId){
            const report = await reportRepository.getReport(rid);
            if (!report){
                throw new NotFoundError('The report was not Found.')
            }

            const isAdmin = report.building.adminId === authId;
            if(isAdmin){
                return report
            }

            // isOwner?
            const ownedApartment = await apartmentRepository.getApartmentByBuildingAndOwner(report.buildingId, authId)
            if(ownedApartment){
                return report
            }

            throw new ForbiddenError('User is not a building Admin or an apartment Owner.')
        },

        async getReports(bid, authId){
            const building = await buildingRepository.getBuilding(bid)

            if(!building){
                throw new NotFoundError('The building was not found.')
            }

            const reports = await reportRepository.getReports(bid)

            const isAdmin = building.adminId === authId
            if(isAdmin){
                return reports
            }
            // isOwner?
            const ownedApartment = await apartmentRepository.getApartmentByBuildingAndOwner(building.id, authId)
            if(ownedApartment){
                return reports
            }

            throw new ForbiddenError('User is not a building Admin or an apartment Owner.')
        },

        async createReport(bid, authId, {expenseIds, description}){
            const building = await buildingRepository.getBuilding(bid);

            if(!building){
                throw new NotFoundError('The building was not found.')
            }

            if(authId !== building.adminId){
                throw new ForbiddenError('The user is not the building Admin.')
            }

            const apartments = await apartmentRepository.getApartmentsByBuilding(bid);
            const expenses = await expenseRepository.getExpensesByIds(expenseIds);

            const categoryIds = [...new Set(expenses.map(e => e.categoryId))]; // Stores uniques
            const categories = await expenseCatRepository.getExpenseCategoriesByIds(categoryIds);
            const categoryMap = new Map(categories.map(c => [c.id, c])); //makes the lookup faster

            const shares = calculateApartmentShares(apartments, expenses, categoryMap);

            const report = await reportRepository.createReport(bid, description, expenseIds, shares);
        }
    }
}