import express from 'express';
import {
  getWorkoutLogs,
  createWorkoutLog,
  getWorkoutLogById,
  updateWorkoutLog,
  deleteWorkoutLog,
} from '../controllers/workoutLogController.js';

const router = express.Router();

// GET all workout logs
router.get('/', getWorkoutLogs);

// POST a new workout log
router.post('/', createWorkoutLog);

// GET a single workout log by ID
router.get('/:id', getWorkoutLogById);

// PUT update a workout log by ID
router.put('/:id', updateWorkoutLog);

// DELETE a workout log by ID
router.delete('/:id', deleteWorkoutLog);

export default router;