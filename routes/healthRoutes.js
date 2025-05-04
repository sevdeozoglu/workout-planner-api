// routes/healthRoutes.js for
//Health check for Vercel Deployment
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running smoothly' });
});

export default router;