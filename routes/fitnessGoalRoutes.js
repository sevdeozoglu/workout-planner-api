// routes/fitnessGoalRoutes.js
import express from 'express';
import {
  createFitnessGoal,
  getFitnessGoals,
  getFitnessGoalById,
  updateFitnessGoal,
  deleteFitnessGoal,
} from '../controllers/fitnessGoalController.js';

import { AuthGuard } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all routes: only logged-in users can access goals
router.use(AuthGuard);

// Create new goal
router.post('/', createFitnessGoal);

// Get all goals of logged-in user
router.get('/', getFitnessGoals);

// Get one goal by ID
router.get('/:id', getFitnessGoalById);

// Update goal by ID
router.put('/:id', updateFitnessGoal);

// Delete goal by ID
router.delete('/:id', deleteFitnessGoal);

export default router;