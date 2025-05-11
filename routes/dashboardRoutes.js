import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { AuthGuard } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', AuthGuard, getDashboardStats);

export default router;