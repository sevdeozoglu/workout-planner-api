// Import the Workout model to interact with the workouts collection in MongoDB
import Workout from '../models/workout.js';

// Controller function to get all workouts
export const getWorkouts = async (req, res, next) => {
  try {
    // Fetch all workouts from the database
    const workouts = await Workout.find();
    // Respond with the retrieved workouts in JSON format
    res.status(200).json(workouts);
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

// Controller function to create a new workout
export const createWorkout = async (req, res, next) => {
  try {
    // Create a new Workout instance using data from the request body
    const workout = new Workout(req.body);
    // Save the new workout to the database
    const savedWorkout = await workout.save();
    // Respond with the saved workout object
    res.status(201).json(savedWorkout);
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

// Controller function to get a single workout by its ID
export const getWorkoutById = async (req, res, next) => {
  try {
    // Find a workout by its ID from the request parameters
    const workout = await Workout.findById(req.params.id);
    // If no workout is found, return a 404 error response
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    // Respond with the found workout
    res.status(200).json(workout);
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

// Controller function to update an existing workout by its ID
export const updateWorkout = async (req, res, next) => {
  try {
    // Find the workout by its ID and update it with new data; 'new: true' returns the updated document
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // If no workout is found, return a 404 error response
    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    // Respond with the updated workout
    res.status(200).json(updatedWorkout);
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

// Controller function to delete a workout by its ID
export const deleteWorkout = async (req, res, next) => {
  try {
    // Find and delete the workout with the given ID
    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
    // If no workout is found, return a 404 error response
    if (!deletedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    // Respond with a success message indicating deletion
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};