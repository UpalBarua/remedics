import express from 'express';
import Service from '../models/Service.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.get('/', async (req, res) => {
  const { limit } = req.query;

  try {
    const services = await Service.find({}).limit(parseInt(limit) || 0);

    if (services.length <= 0) {
      return res.status(404).json({ message: 'No services found.' });
    }

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'No id provided.' });
  }

  try {
    const services = await Service.findOne({
      _id: ObjectId(id),
    });

    if (!services) {
      return res.status(404).json({ message: 'Service not found.' });
    }

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({ message: 'Data in missing.' });
  }

  try {
    const response = await Service.create(body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as servicesRoutes };
