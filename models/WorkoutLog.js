import mongoose from 'mongoose';

const WorkoutLogSchema = new mongoose.Schema({
  // Reference to the Workout that was completed
  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    required: true,
  },
  // Reference to the User who performed the workout ✅
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // The date/time when the workout was performed; defaults to current date/time
  date: {
    type: Date,
    default: Date.now,
  },
  // Duration of the workout in minutes
  duration: {
    type: Number,
    required: true,
  },
  // Optional notes about the workout session
  notes: {
    type: String,
  },
});

export default mongoose.model('WorkoutLog', WorkoutLogSchema);