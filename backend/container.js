import { prisma } from './prismaClient.js';

import { createUserRepository } from './repositories/userRepository.js';
import { createUserService } from './services/userService.js'
import { createUserController } from './controllers/userController.js';

import { createBuildingRepository } from './repositories/BuildingRepository.js';
import { createBuildingService } from './services/buildingService.js';
import { createBuildingController } from './controllers/buildingController.js';

import { createApartmentRepository } from './repositories/apartmentRepository.js';
import { createApartmentService } from './services/apartmentService.js';
import { createApartmentController } from './controllers/apartmentConstoller.js';

import { createAuthService } from './services/authService.js';
import { createAuthController } from './controllers/authController.js';

import { createBillRepository } from './repositories/billRepository.js';
import { createBillService } from './services/billService.js';
import { createBillController } from './controllers/billController.js';

const userRepository = createUserRepository(prisma);
const userService = createUserService(userRepository);
const userController = createUserController(userService);

const buildingRepository = createBuildingRepository(prisma);
const buildingService = createBuildingService(buildingRepository);
const buildingController = createBuildingController(buildingService);

const apartmentRepository = createApartmentRepository(prisma);
const apartmentService = createApartmentService(apartmentRepository, buildingRepository);
const apartmentController = createApartmentController(apartmentService);

const authService = createAuthService(userRepository);
const authController = createAuthController(authService);

const billRepository = createBillRepository(prisma);
const billService = createBillService(billRepository, apartmentRepository);
const billController = createBillController(billService)

export { buildingController, apartmentController, userController, authController, billController };
