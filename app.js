// Import the Express framework and Morgan logging middleware
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import workoutRoutes from './routes/workoutRoutes.js'; // Import the routes file
import workoutLogRoutes from './routes/workoutLogRoutes.js'; // Import the workout log routes
import authRoutes from './routes/authRoutes.js'; // Import authentication routes
import fitnessGoalRoutes from './routes/fitnessGoalRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import configurePassport from './config/passport.js'; // Import passport configuration

// Create an instance of an Express application
const app = express();

// Use Morgan middleware in 'dev' mode to log HTTP requests for debugging purposes
app.use(morgan('dev'));

// Use Express's built-in JSON parser middleware to automatically parse incoming JSON request bodies
app.use(express.json());

// Initialize Passport middleware
app.use(passport.initialize());
// Configure Passport with our JWT strategy
configurePassport(passport);

// Mount the routes under /api/workouts
app.use('/api/workouts', workoutRoutes);
app.use('/api/workout-logs', workoutLogRoutes); // New endpoint for workout logs
app.use('/api/auth', authRoutes); // Authentication endpoints
app.use('/api/fitness-goals', fitnessGoalRoutes);

// Error handling middleware should be added last.
app.use(errorHandler);

// Export the Express application instance so it can be imported and used in other parts of the project (e.g., server.js)
export default app;