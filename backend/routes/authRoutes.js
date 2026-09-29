import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { authController } from '../container.js';

const router = express.Router();

router.get('/verify', authMiddleware, authController.verify)
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router;