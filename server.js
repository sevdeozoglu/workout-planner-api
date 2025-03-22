// Import the Express app instance from app.js
import app from './app.js';
// Import dotenv to load environment variables from a .env file
import dotenv from 'dotenv';
// Import the connectDB function that handles connecting to MongoDB
import connectDB from './config/db.js';

// Load environment variables from the .env file into process.env
dotenv.config();

// Connect to the MongoDB database using the connectDB function.
// The 'await' ensures that the connection is established before continuing.
await connectDB();

// Retrieve the PORT value from environment variables; default to 3000 if not set
const PORT = process.env.PORT || 3000;

// Start the Express server on the specified port and log a confirmation message
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});