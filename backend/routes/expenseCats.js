import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import { createCategory } from "../controllers/expenseCatsController.js";
const router = express.Router();

router.use(authMiddleware);

router.post("/", createCategory);

export default router;
