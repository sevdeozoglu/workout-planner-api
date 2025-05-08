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
      user: req.user._id, // user is required for private logs
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

    // Only allow the owner to view this log
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

    // Only allow the owner to update
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

    // Only allow the owner to delete
    if (!log.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    await WorkoutLog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Workout log deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Controller: Generate a summary of workouts for the logged-in user
export const getWorkoutSummary = async (req, res, next) => {
  try {
    const summary = await WorkoutLog.aggregate([
      //Filter logs belonging only to the logged-in user
      { $match: { user: req.user._id } },

      //Group logs by workout ID
      {
        $group: {
          _id: "$workout",              // Group by workout ID
          count: { $sum: 1 },           // Count how many times each workout was done
          totalDuration: { $sum: "$duration" } // Sum total duration of each workout
        }
      },
      
      //Join with the workouts collection to get workout names
      {
        $lookup: {
          from: "workouts",             // Collection to join with
          localField: "_id",            // Field in current collection (WorkoutLog)
          foreignField: "_id",          // Field in workouts collection
          as: "workoutDetails"          // Alias for joined data
        }
      },

      //Unwind the joined workout array into a single object
      {
        $unwind: "$workoutDetails"
      },

      //Shape the final output
      {
        $project: {
          _id: 0,                       // Exclude MongoDB's default _id
          workoutName: "$workoutDetails.name", // Rename field for clarity
          count: 1,                     // Include count
          totalDuration: 1              // Include total duration
        }
      }
    ]);

    // Send the summary as the response
    res.status(200).json(summary);
  } catch (error) {
    // Forward any errors to the global error handler
    next(error);
  }
};