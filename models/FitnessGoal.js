// models/FitnessGoal.js
import mongoose from 'mongoose';

const FitnessGoalSchema = new mongoose.Schema({
  // User who owns this goal
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Title or name of the goal
  goal: {
    type: String,
    required: true
  },
  // Optional description
  description: {
    type: String
  },
  // Target completion date
  targetDate: {
    type: Date
  },
  // Whether the goal is completed
  isCompleted: {
    type: Boolean,
    default: false
  },
  // Date when the goal was created
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('FitnessGoal', FitnessGoalSchema);