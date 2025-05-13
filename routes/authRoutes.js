// Import express and the controller functions for authentication
import express from 'express';
import { register, login, getProfileInfo } from '../controllers/authController.js';
import { AuthGuard } from '../middleware/authMiddleware.js';
import { body, validationResult } from 'express-validator';

const AuthRouter = express.Router();

// Route to the user
AuthRouter.get('/me', AuthGuard, getProfileInfo);

// @route   POST /api/auth/register
// @desc    Register a new user with validation
// @access  Public
AuthRouter.post(
    '/register',
    [
      body('username').notEmpty().withMessage('Username is required'),
      body('email').isEmail().withMessage('Invalid email address'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // If validation passed, proceed with registration controller
      register(req, res, next);
    }
  );

// Route to handle user login
AuthRouter.post('/login', login);

export default AuthRouter;