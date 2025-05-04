// Import express and the controller functions for authentication
import express from 'express';
import { register, login, getProfileInfo } from '../controllers/authController.js';
import { AuthGuard } from '../middleware/authMiddleware.js';

const AuthRouter = express.Router();

// Route to the user
AuthRouter.get('/me', AuthGuard, getProfileInfo);

// Route to handle user registration
AuthRouter.post('/register', register);

// Route to handle user login
AuthRouter.post('/login', login);

export default AuthRouter;