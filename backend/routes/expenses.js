import express from 'express';
import { createExpense } from '../controllers/expensesController.js';
const router = express.Router();

// Get All
// router.get('/', );

// Post new Expensε
router.post('/', createExpense);

export default router;