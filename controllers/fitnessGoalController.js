// controllers/fitnessGoalController.js
import FitnessGoal from '../models/FitnessGoal.js';

// CREATE a new fitness goal
export const createFitnessGoal = async (req, res, next) => {
  try {
    const goal = new FitnessGoal({
      ...req.body,
      user: req.user._id
    });
    const savedGoal = await goal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    next(error);
  }
};

// GET all goals of the logged-in user
export const getFitnessGoals = async (req, res, next) => {
  try {
    const goals = await FitnessGoal.find({ user: req.user._id });
    res.status(200).json(goals);
  } catch (error) {
    next(error);
  }
};

// GET single goal by ID (only if owned by user)
export const getFitnessGoalById = async (req, res, next) => {
  try {
    const goal = await FitnessGoal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    if (!goal.user.equals(req.user._id))
      return res.status(403).json({ message: 'Unauthorized access' });

    res.status(200).json(goal);
  } catch (error) {
    next(error);
  }
};

// UPDATE a goal (only if owned by user)
export const updateFitnessGoal = async (req, res, next) => {
  try {
    const goal = await FitnessGoal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    if (!goal.user.equals(req.user._id))
      return res.status(403).json({ message: 'Unauthorized access' });

    const updatedGoal = await FitnessGoal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedGoal);
  } catch (error) {
    next(error);
  }
};

// DELETE a goal (only if owned by user)
export const deleteFitnessGoal = async (req, res, next) => {
  try {
    const goal = await FitnessGoal.findById(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    if (!goal.user.equals(req.user._id))
      return res.status(403).json({ message: 'Unauthorized access' });

    await FitnessGoal.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    next(error);
  }
};