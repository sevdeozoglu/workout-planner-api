// Import Express and create a new router
import express from 'express';
const router = express.Router();

// Import the controller functions
import {
  getWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
} from '../controllers/workoutController.js';

// Define the endpoints:

// GET /api/workouts - Retrieve all workouts
router.get('/', getWorkouts);

// POST /api/workouts - Create a new workout
router.post('/', createWorkout);

// GET /api/workouts/:id - Retrieve a single workout by ID
router.get('/:id', getWorkoutById);

// PUT /api/workouts/:id - Update a workout by ID
router.put('/:id', updateWorkout);

// DELETE /api/workouts/:id - Delete a workout by ID
router.delete('/:id', deleteWorkout);

// Export the router to be used in app.js
export default router;