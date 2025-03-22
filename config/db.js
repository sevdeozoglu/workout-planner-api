// Import mongoose to interact with MongoDB
import mongoose from 'mongoose';

// Define an asynchronous function to connect to the database
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the connection string stored in the environment variable MONGO_URI
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // Log a success message with the host of the connected MongoDB instance
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log an error message if the connection fails
    console.error(`Error: ${error.message}`);
    
    // Exit the process with a failure status (1) if there's an error connecting to MongoDB
    process.exit(1);
  }
};

// Export the connectDB function as the default export of this module
export default connectDB;