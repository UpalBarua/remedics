require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const Service = require('./models/Service');
const Review = require('./models/Review');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server running...');
});

app.get('/services', async (req, res) => {
  try {
    const { limit } = req.query;
    const services = await Service.find({}).limit(parseInt(limit) || 0);

    if (!services) res.status(404).json({ message: 'No services found.' });

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/services', async (req, res) => {
  const { body } = req;

  if (!body) res.status(400).json({ message: 'Data in missing.' });

  try {
    const response = await Service.create(body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/services/:serviceId', async (req, res) => {
  const { serviceId } = req.params;

  if (!serviceId) res.status(400).json({ message: 'No id provided.' });

  try {
    const service = await Service.findOne({
      _id: ObjectId(serviceId),
    });

    if (!service) res.status(404).json({ message: 'Service not found.' });

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/reviews/:serviceId', async (req, res) => {
  const { body } = req;

  if (!body) res.status(400).json({ message: 'Body not provided.' });

  try {
    const response = await Review.create(body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/reviews/:serviceId', async (req, res) => {
  const { serviceId } = req.params;

  try {
    const reviews = await Review.find({ service: serviceId });

    if (!reviews) res.status(400).json({ message: 'Reviews not found.' });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/reviews/:reviewId', async (req, res) => {
  const { reviewId } = req.params;

  try {
    const response = await Review.deleteOne({
      _id: ObjectId(reviewId),
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/reviews/user/:userEmail', async (req, res) => {
  const { userEmail } = req.params;

  try {
    const response = await Review.find({ email: userEmail });

    if (!response) res.status(404).json({ message: 'Reviews not found.' });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch('/reviews/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  try {
    const response = await Review.updateOne(
      { _id: ObjectId(reviewId) },
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
});

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
