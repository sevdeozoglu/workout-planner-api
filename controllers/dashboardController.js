import Workout from '../models/workout.js';
import WorkoutLog from '../models/WorkoutLog.js';
import FitnessGoal from '../models/FitnessGoal.js';

// Controller: Returns a dashboard summary for the logged-in user
export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id; // Get the ID of the currently logged-in user

    // Fetch the latest 3 records for workouts, workout logs, and fitness goals
    // All results are filtered by user ID to ensure privacy
    const [workouts, logs, goals] = await Promise.all([
      // Get last 3 workouts (sorted by creation date)
      Workout.find({ user: userId }).sort({ date: -1 }).limit(3),

      // Get last 3 workout logs (including populated workout name)
      WorkoutLog.find({ user: userId }).sort({ date: -1 }).limit(3).populate('workout'),

      // Get last 3 fitness goals (sorted by creation time)
      FitnessGoal.find({ user: userId }).sort({ createdAt: -1 }).limit(3),
    ]);

    // Respond with summary counts and latest entries
    res.status(200).json({
      workoutCount: workouts.length,          // Total workouts (counted from fetched)
      workoutList: workouts,                  // Latest 3 workouts

      logCount: logs.length,                  // Total logs (counted from fetched)
      workoutLogList: logs,                   // Latest 3 logs with workout names

      goalCount: goals.length,                // Total fitness goals (counted from fetched)
      fitnessGoalList: goals,                 // Latest 3 goals
    });
  } catch (error) {
    // Pass any error to the error handling middleware
    next(error);
  }
};