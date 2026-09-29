import express from 'express';
import { createExpense, getExpenses, getExpenseCats, postExpenseCat, createReport, getReports } from '../controllers/expensesController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true});

// Get All
// router.get('/', );

router.use(authMiddleware);

// Post new Expense
router.get('/', getExpenses);
router.post('/', createExpense);
router.get('/categories', getExpenseCats)
router.post('/categories', postExpenseCat);
router.post('/issue', createReport)
router.get('/reports', getReports)


export default router;