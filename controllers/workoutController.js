// Import the Workout model to interact with the workouts collection in MongoDB
import Workout from '../models/workout.js';

// Controller function to get all workouts
export const getWorkouts = async (req, res, next) => {
  try {
    // Filter workouts by the user's ID
    const workouts = await Workout.find({ user: req.user._id });
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
    // Merge request body with the user id from req.user (populated by your AuthGuard)
    const workoutData = { ...req.body, user: req.user._id };
    const workout = new Workout(workoutData);
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
    // Find the workout by its ID
    const workout = await Workout.findById(req.params.id);
    // If no workout is found, return a 404 error response
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    // Check if the logged-in user owns this workout
    // Use .equals() if workout.user is a Mongoose ObjectId, or convert both to strings
    if (!workout.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized: You do not own this workout' });
    }
    // If authorized, update the workout with new data
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
    // Find the workout by its ID
    const workout = await Workout.findById(req.params.id);
    // If no workout is found, return a 404 error response
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    // Check if the logged-in user is the owner of the workout
    if (!workout.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized: You do not own this workout' });
    }
    // If authorized, delete the workout
    await Workout.findByIdAndDelete(req.params.id);
    // Respond with a success message indicating deletion
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
};

// Controller: Search workouts by name (keyword)
export const searchWorkouts = async (req, res, next) => {
  try {
    // Get the search keyword from the query string (e.g., ?q=arm)
    const keyword = req.query.q || '';

    // Find workouts that belong to the logged-in user
    // and whose name contains the keyword
    const workouts = await Workout.find({
      user: req.user._id,
      name: { $regex: keyword, $options: 'i' }
    });

    // Return the filtered workout list
    res.status(200).json(workouts);
  } catch (error) {
    // Forward any errors to the global error handler
    next(error);
  }
};