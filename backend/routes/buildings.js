import express from 'express';
import { getBuildings, getBuilding, postBuilding } from '../controllers/buildingController.js';
import authMiddleware from "../middleware/authMiddleware.js"
const router = express.Router();

router.use(authMiddleware);

// Get All
router.get('/', getBuildings);

// Get by ID
router.get('/:id', getBuilding);

// Post new Building
router.post('/', postBuilding);

export default router;