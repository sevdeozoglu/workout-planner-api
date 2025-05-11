import Workout from '../models/workout.js';
import WorkoutLog from '../models/WorkoutLog.js';
import FitnessGoal from '../models/FitnessGoal.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Count + get top 3 latest records for each category
    const [workouts, logs, goals] = await Promise.all([
      Workout.find({ user: userId }).sort({ date: -1 }).limit(3),
      WorkoutLog.find({ user: userId }).sort({ date: -1 }).limit(3).populate('workout'),
      FitnessGoal.find({ user: userId }).sort({ createdAt: -1 }).limit(3),
    ]);

    res.status(200).json({
      workoutCount: workouts.length,
      workoutList: workouts,

      logCount: logs.length,
      workoutLogList: logs,

      goalCount: goals.length,
      fitnessGoalList: goals,
    });
  } catch (error) {
    next(error);
  }
};