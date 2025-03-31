import WorkoutLog from '../models/WorkoutLog.js';

// Controller function to get all workout logs
export const getWorkoutLogs = async (req, res, next) => {
  try {
    // Optionally populate the workout details in the log
    const logs = await WorkoutLog.find().populate('workout');
    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
};

// Controller function to create a new workout log
export const createWorkoutLog = async (req, res, next) => {
  try {
    const log = new WorkoutLog(req.body);
    const savedLog = await log.save();
    res.status(201).json(savedLog);
  } catch (error) {
    next(error);
  }
};

// Controller function to get a single workout log by ID
export const getWorkoutLogById = async (req, res, next) => {
  try {
    const log = await WorkoutLog.findById(req.params.id).populate('workout');
    if (!log) {
      return res.status(404).json({ message: 'Workout log not found' });
    }
    res.status(200).json(log);
  } catch (error) {
    next(error);
  }
};

// Controller function to update an existing workout log by ID
export const updateWorkoutLog = async (req, res, next) => {
  try {
    const updatedLog = await WorkoutLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLog) {
      return res.status(404).json({ message: 'Workout log not found' });
    }
    res.status(200).json(updatedLog);
  } catch (error) {
    next(error);
  }
};

// Controller function to delete a workout log by ID
export const deleteWorkoutLog = async (req, res, next) => {
  try {
    const deletedLog = await WorkoutLog.findByIdAndDelete(req.params.id);
    if (!deletedLog) {
      return res.status(404).json({ message: 'Workout log not found' });
    }
    res.status(200).json({ message: 'Workout log deleted successfully' });
  } catch (error) {
    next(error);
  }
};