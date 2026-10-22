import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { reportController } from '../container.js';
import { report } from 'node:process';

const router = express.Router({ mergeParams: true});

router.use(authMiddleware);
router.get('/reports/:rid', reportController.getReport);
router.get('/buildings/:bid/reports', reportController.getReports);
router.post('/buildings/:bid/reports', reportController.createReport);

export default router;