// routes/workoutLogRoutes.js

// Importing the Express framework
import express from 'express';

// Importing controller functions for workout log operations
import {
  getWorkoutLogs,
  createWorkoutLog,
  getWorkoutLogById,
  updateWorkoutLog,
  deleteWorkoutLog,
} from '../controllers/workoutLogController.js';

// Importing the AuthGuard middleware to protect routes
import { AuthGuard } from '../middleware/authMiddleware.js';

import { getWorkoutSummary } from '../controllers/workoutLogController.js';

import { body, validationResult } from 'express-validator';

// Creating a new router instance
const router = express.Router();

// 🛡️ Apply the AuthGuard middleware to all routes below
// This ensures only logged-in users can access workout log routes
router.use(AuthGuard);

// @route   GET /api/workout-logs
// @desc    Get all workout logs for the logged-in user
router.get('/', getWorkoutLogs);

// @route   POST /api/workout-logs
// @desc    Create a new workout log for the user
router.post(
  '/',
  [
    body('workout').notEmpty().withMessage('Workout ID is required'),
    body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive number'),
    body('notes').optional().isString().withMessage('Notes must be a string'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    createWorkoutLog(req, res, next);
  }
);


// @route   GET /api/workout-logs/summary
// @desc    Get workout summary (count and total duration per workout)
router.get('/summary', getWorkoutSummary);

// @route   GET /api/workout-logs/:id
// @desc    Get a single workout log by ID (only if it belongs to the user)
router.get('/:id', getWorkoutLogById);

// @route   PUT /api/workout-logs/:id
// @desc    Update a workout log (only if it belongs to the user)
router.put('/:id', updateWorkoutLog);

// @route   DELETE /api/workout-logs/:id
// @desc    Delete a workout log (only if it belongs to the user)
router.delete('/:id', deleteWorkoutLog);

// Export the router to be used in app.js
export default router;