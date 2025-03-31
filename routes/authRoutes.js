// Import express and the controller functions for authentication
import express from 'express';
import { register, login } from '../controllers/authController.js';

const AuthRouter = express.Router();

// Route to handle user registration
AuthRouter.post('/register', register);

// Route to handle user login
AuthRouter.post('/login', login);

export default AuthRouter;