import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { billController } from '../container.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/:bid', billController.getBill)

export default router;