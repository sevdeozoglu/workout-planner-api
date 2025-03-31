// Import required libraries and modules
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js'; // Ensure the file name is 'User.js' for consistency

// Load environment variables from .env file
dotenv.config();

// Function to generate a JWT token for a user
const generateToken = (user) => {
  return jwt.sign(
    { id: user.user_id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Controller function to register a new user
export const register = async (req, res) => {
  try {
    // Create a new User instance using the request body data
    const user = new User(req.body);
    // Save the user to the database
    await user.save();
    // Return a success message with a 201 status code
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Return an error message with a 400 status code if registration fails
    res.status(400).json({ error: error.message });
  }
};

// Controller function to handle user login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find a user with the given email
    const user = await User.findOne({ email });
    // If no user is found or password does not match, return an error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // If credentials are valid, generate a JWT token and send it in the response
    res.json({ token: generateToken(user) });
  } catch (error) {
    // Return a 500 error if something goes wrong during login
    res.status(500).json({ error: error.message });
  }
};