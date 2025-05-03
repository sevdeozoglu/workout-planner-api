import WorkoutLog from '../models/WorkoutLog.js';

// Controller function to get all workout logs for the logged-in user
export const getWorkoutLogs = async (req, res, next) => {
  try {
    // Find only the logs that belong to the current user
    // Populate the workout field if you want detailed workout info
    const logs = await WorkoutLog.find({ user: req.user._id }).populate('workout');

    // Return the filtered logs
    res.status(200).json(logs);
  } catch (error) {
    // Pass any errors to the global error handler
    next(error);
  }
};

// Controller function to create a new workout log
export const createWorkoutLog = async (req, res, next) => {
  try {
    // Attach the current user to the log
    const log = new WorkoutLog({
      ...req.body,
      user: req.user._id, // 👈 user is required for private logs
    });

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

    // 🔐 Only allow the owner to view this log
    if (!log.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.status(200).json(log);
  } catch (error) {
    next(error);
  }
};

// Controller function to update an existing workout log by ID
export const updateWorkoutLog = async (req, res, next) => {
  try {
    const log = await WorkoutLog.findById(req.params.id);

    if (!log) {
      return res.status(404).json({ message: 'Workout log not found' });
    }

    // 🔐 Only allow the owner to update
    if (!log.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const updatedLog = await WorkoutLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedLog);
  } catch (error) {
    next(error);
  }
};

// Controller function to delete a workout log by ID
export const deleteWorkoutLog = async (req, res, next) => {
  try {
    const log = await WorkoutLog.findById(req.params.id);

    if (!log) {
      return res.status(404).json({ message: 'Workout log not found' });
    }

    // 🔐 Only allow the owner to delete
    if (!log.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    await WorkoutLog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Workout log deleted successfully' });
  } catch (error) {
    next(error);
  }
};