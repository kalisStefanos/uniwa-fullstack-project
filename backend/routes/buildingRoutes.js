import { Router } from 'express';
import authMiddleware from "../middleware/authMiddleware.js"
import { buildingController } from '../container.js'

const router = Router();

router.use(authMiddleware);

router.get('/:id', buildingController.getBuilding);
router.get('/', buildingController.getBuildings);
router.post('/', buildingController.createBuilding)

//router.get('/:id/apartments/:aid', getBuildingApartment);

//router.get('/:id/apartments', getBuildingApartments);

//router.post('/:id/apartments', postBuildingApartment);

//router.put('/:id/apartments/:aid', putBuildingApartment);

export default router;