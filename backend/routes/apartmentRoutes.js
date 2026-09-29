import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { apartmentController, billController } from '../container.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/apartments', apartmentController.getMyApartments)
router.get('/apartments/:aid', apartmentController.getApartment)
router.get('/buildings/:bid/apartments', apartmentController.getApartmentsByBuilding)
router.get('/apartments/:aid/bills', billController.getBillsByApartment)
router.post('/buildings/:bid/apartments', apartmentController.createApartment)
router.put('/apartments/:aid/edit', apartmentController.updateApartment);
router.put('/apartments/:aid/code', apartmentController.generateClaimCode)
router.put('/apartments', apartmentController.claimApartment)
router.delete('/apartments/:aid', apartmentController.deleteApartment);

export default router;