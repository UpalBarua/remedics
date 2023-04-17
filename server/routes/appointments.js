import express from 'express';
import Appointment from '../models/Appointment.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find({});

    if (!appointments) {
      return res.status(404).json({ message: 'No appointments found.' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { body } = req;

  try {
    const appointment = await Appointment.create(body);

    if (!appointment) {
      return res.status(400).json({ message: 'Failed to add appointment' });
    }

    res.status(201).json(appointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export { router as appointmentsRouter };
