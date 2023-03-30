import Review from '../models/Review.js';
import { ObjectId } from 'mongodb';

const createReview = async (req, res) => {
  const { body } = req;

  if (!body) res.status(400).json({ message: 'Body not provided.' });

  try {
    const response = await Review.create(body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReview = async (req, res) => {
  const { id } = req.params;

  try {
    const reviews = await Review.find({ service: id });

    if (!reviews) res.status(400).json({ message: 'Reviews not found.' });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Review.deleteOne({
      _id: ObjectId(id),
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserReview = async (req, res) => {
  const { email } = req.params;

  try {
    const response = await Review.find({ email: email });

    if (!response) res.status(404).json({ message: 'Reviews not found.' });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReview = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Review.updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          review: req.body.newReview,
        },
      },
      {
        upsert: true,
      }
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createReview, deleteReview, getReview, getUserReview, updateReview };
