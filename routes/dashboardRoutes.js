// Import Express and necessary controller/middleware
import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { AuthGuard } from '../middleware/authMiddleware.js';

// Initialize an Express Router instance
const router = express.Router();

// @route   GET /api/dashboard
// @desc    Returns summary data (counts + recent workouts/logs/goals) for the logged-in user
// @access  Private (requires authentication via AuthGuard)
router.get('/', AuthGuard, getDashboardStats);

// Export the router to be used in app.js
export default router;