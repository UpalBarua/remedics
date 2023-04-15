import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { body } = req;

  if (!body) res.status(400).json({ message: 'Body not provided.' });

  try {
    const response = await User.create(body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as userRoutes };
