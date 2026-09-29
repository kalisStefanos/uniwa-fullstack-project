import express from 'express';

import { userController } from '../container.js'

const router = express.Router();

router.get('/:uid', userController.getUser);

export default router;