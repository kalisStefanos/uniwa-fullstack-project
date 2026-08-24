import express from 'express';
import { createReport } from '../controllers/reportsController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.use(authMiddleware);
router.post('/', createReport);

export default router;