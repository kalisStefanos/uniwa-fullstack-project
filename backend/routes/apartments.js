import express from 'express';
import { createApt, deleteApt } from '../controllers/apartmentsConstoller.js';
const router = express.Router();

// Create Apartment
router.post('/', createApt);
router.delete('/:bid/:id', deleteApt);

export default router;