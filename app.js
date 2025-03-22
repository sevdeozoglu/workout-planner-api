// Import the Express framework and Morgan logging middleware
import express from 'express';
import morgan from 'morgan';

// Create an instance of an Express application
const app = express();

// Use Morgan middleware in 'dev' mode to log HTTP requests for debugging purposes
app.use(morgan('dev'));

// Use Express's built-in JSON parser middleware to automatically parse incoming JSON request bodies
app.use(express.json());

// Export the Express application instance so it can be imported and used in other parts of the project (e.g., server.js)
export default app;