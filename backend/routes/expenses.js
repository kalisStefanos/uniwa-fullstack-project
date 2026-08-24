import express from 'express';
import { createExpense } from '../controllers/expensesController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

// Get All
// router.get('/', );

router.use(authMiddleware);

// Post new Expensε
router.post('/', createExpense);

export default router;