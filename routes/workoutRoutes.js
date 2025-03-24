// routes/workoutRoutes.js
import express from 'express';
const router = express.Router();

// Test endpoint for workouts
router.get('/', (req, res) => {
  res.json({ message: 'Workout API is working!' });
});

export default router;