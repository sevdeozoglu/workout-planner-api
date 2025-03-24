// Import mongoose to interact with MongoDB
import mongoose from 'mongoose';

// Define a schema for the Workout model
const WorkoutSchema = new mongoose.Schema({
  // The name of the workout (e.g., "Leg Day")
  name: {
    type: String,
    required: true, // This field is required
  },
  // An array to hold exercises included in the workout
  exercises: [
    {
      // The name of the exercise (e.g., "Squat")
      name: { type: String },
      // The number of sets for this exercise
      sets: { type: Number },
      // The number of repetitions per set
      reps: { type: Number },
      // Rest time between sets in seconds
      restTime: { type: Number },
    }
  ],
  // The date when the workout was created; defaults to the current date/time
  date: {
    type: Date,
    default: Date.now,
  }
});

// Create the Workout model using the schema and export it as the default export
export default mongoose.model('Workout', WorkoutSchema);