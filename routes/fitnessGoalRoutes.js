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
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Protect all routes: only logged-in users can access goals
router.use(AuthGuard);

// @route   POST /api/fitness-goals
// @desc    Create a new fitness goal with validation
router.post(
  '/',
  [
    body('goal').notEmpty().withMessage('Goal title is required'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('targetDate').optional().isISO8601().withMessage('Target date must be a valid date'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    createFitnessGoal(req, res, next);
  }
);


// Get all goals of logged-in user
router.get('/', getFitnessGoals);

// Get one goal by ID
router.get('/:id', getFitnessGoalById);

// Update goal by ID
router.put('/:id', updateFitnessGoal);

// Delete goal by ID
router.delete('/:id', deleteFitnessGoal);

export default router;