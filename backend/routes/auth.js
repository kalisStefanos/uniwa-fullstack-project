import express from 'express';
import { deleteUser, login, register } from '../controllers/authController.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/users/:id', deleteUser);

export default router;