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

const router = express.Router();
// Define the endpoints:

// Apply AuthGuard so only authenticated users can access these endpoints
router.use(AuthGuard);

// GET /api/workouts - Retrieve all workouts
router.get('/', getWorkouts);

// POST /api/workouts - Create a new workout
router.post('/', createWorkout);

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