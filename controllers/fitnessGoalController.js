// controllers/fitnessGoalController.js
import FitnessGoal from '../models/FitnessGoal.js';

// CREATE a new fitness goal
export const createFitnessGoal = async (req, res, next) => {
  try {
    // Create a new goal, attaching the user ID from the authenticated request
    const goal = new FitnessGoal({
      ...req.body,
      user: req.user._id
    });

    // Save the goal to the database
    const savedGoal = await goal.save();

    // Respond with the newly created goal
    res.status(201).json(savedGoal);
  } catch (error) {
    // Pass any errors to the global error handler
    next(error);
  }
};

// GET all goals of the logged-in user
export const getFitnessGoals = async (req, res, next) => {
  try {
    // Retrieve all goals that belong to the authenticated user
    const goals = await FitnessGoal.find({ user: req.user._id });

    // Send the goals as a JSON response
    res.status(200).json(goals);
  } catch (error) {
    next(error);
  }
};

// GET single goal by ID (only if owned by user)
export const getFitnessGoalById = async (req, res, next) => {
  try {
    // Find the goal by ID
    const goal = await FitnessGoal.findById(req.params.id);

    // If no goal is found, return a 404
    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    // Check if the goal belongs to the authenticated user
    if (!goal.user.equals(req.user._id))
      return res.status(403).json({ message: 'Unauthorized access' });

    // Respond with the goal
    res.status(200).json(goal);
  } catch (error) {
    next(error);
  }
};

// UPDATE a goal (only if owned by user)
export const updateFitnessGoal = async (req, res, next) => {
  try {
    // Find the goal by ID
    const goal = await FitnessGoal.findById(req.params.id);

    // If no goal is found, return a 404
    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    // Check ownership
    if (!goal.user.equals(req.user._id))
      return res.status(403).json({ message: 'Unauthorized access' });

    // Update the goal with new data
    const updatedGoal = await FitnessGoal.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Respond with the updated goal
    res.status(200).json(updatedGoal);
  } catch (error) {
    next(error);
  }
};

// DELETE a goal (only if owned by user)
export const deleteFitnessGoal = async (req, res, next) => {
  try {
    // Find the goal by ID
    const goal = await FitnessGoal.findById(req.params.id);

    // If not found, return a 404
    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    // Check if the goal belongs to the logged-in user
    if (!goal.user.equals(req.user._id))
      return res.status(403).json({ message: 'Unauthorized access' });

    // Delete the goal from the database
    await FitnessGoal.findByIdAndDelete(req.params.id);

    // Confirm deletion
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    next(error);
  }
};