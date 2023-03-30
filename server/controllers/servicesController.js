import { ObjectId } from 'mongodb';
import Service from '../models/Service.js';

const getAllServices = () => async (req, res) => {
  try {
    const { limit } = req.query;
    const services = await Service.find({}).limit(parseInt(limit) || 0);

    if (!services) res.status(404).json({ message: 'No services found.' });

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getService = () => async (req, res) => {
  const { id } = req.params;

  if (!id) res.status(400).json({ message: 'No id provided.' });

  try {
    const service = await Service.findOne({
      _id: ObjectId(id),
    });

    if (!service) res.status(404).json({ message: 'Service not found.' });

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createService = async (req, res) => {
  const { body } = req;

  if (!body) res.status(400).json({ message: 'Data in missing.' });

  try {
    const response = await Service.create(body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllServices, getService, createService };
