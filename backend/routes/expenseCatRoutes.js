import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { expenseCatController } from '../container.js';

const router = express.Router({ mergeParams: true});

router.use(authMiddleware);

router.get('/buildings/:bid/expenses/categories', expenseCatController.getExpenseCategories);
router.post('/buildings/:bid/expenses/categories', expenseCatController.createExpenseCategory);

export default router;