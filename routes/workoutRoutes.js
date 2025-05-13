// Import Express and create a new router
import express from 'express';

// Import the controller functions
import {
  getWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
} from '../controllers/workoutController.js';
import { AuthGuard } from '../middleware/authMiddleware.js';
import { searchWorkouts } from '../controllers/workoutController.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();
// Define the endpoints:

// Apply AuthGuard so only authenticated users can access these endpoints
router.use(AuthGuard);

// GET /api/workouts - Retrieve all workouts
router.get('/', getWorkouts);

// @route   POST /api/workouts
// @desc    Create a new workout with validation
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Workout name is required'),
    body('exercises').isArray({ min: 1 }).withMessage('At least one exercise is required'),
    body('exercises.*.name').notEmpty().withMessage('Exercise name is required'),
    body('exercises.*.sets').isInt({ min: 1 }).withMessage('Sets must be a positive number'),
    body('exercises.*.reps').isInt({ min: 1 }).withMessage('Reps must be a positive number'),
    body('exercises.*.restTime').isInt({ min: 0 }).withMessage('Rest time must be a number'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Call controller if validation passes
    createWorkout(req, res, next);
  }
);

// Route to search workouts by name
router.get('/search', searchWorkouts);

// GET /api/workouts/:id - Retrieve a single workout by ID
router.get('/:id', getWorkoutById);

// PUT /api/workouts/:id - Update a workout by ID
router.put('/:id', updateWorkout);

// DELETE /api/workouts/:id - Delete a workout by ID
router.delete('/:id', deleteWorkout);


// Export the router to be used in app.js
export default router;