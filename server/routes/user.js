import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { email } = req.query;

  try {
    const result = await User.findOne({ email: email });

    if (!result) {
      return res.status(404).json({ message: 'No user found.' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({ message: 'Body not provided.' });
  }

  try {
    const response = await User.create(body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as userRoutes };
