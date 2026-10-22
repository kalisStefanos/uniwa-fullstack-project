import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { expenseController } from '../container.js';

const router = express.Router({ mergeParams: true});

router.use(authMiddleware);

router.get('/expenses/:id', expenseController.getExpense);
router.get('/buildings/:bid/expenses', expenseController.getExpenses);
router.post('/buildings/:bid/expenses', expenseController.createExpense)


export default router;