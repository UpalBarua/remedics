const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server running...');
});

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.4w0vbzl.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  const servicesCollection = client.db('remedics').collection('services');
  const blogCollection = client.db('remedics').collection('blog');
  const reviewsCollection = client.db('remedics').collection('reviews');

  try {
    app.get('/services', async (req, res) => {
      const query = {};
      const limit = parseInt(req.query.limit) || 0;
      const services = await servicesCollection
        .find(query)
        .limit(limit)
        .toArray();
      res.json(services);
    });

    app.post('/services', async (req, res) => {
      const response = await servicesCollection.insertOne(req.body);
      res.json(response);
    });

    app.get('/services/:serviceId', async (req, res) => {
      const query = { _id: ObjectId(req.params.serviceId) };
      const service = await servicesCollection.findOne(query);
      res.json(service);
    });

    app.get('/blog', async (req, res) => {
      const query = {};
      const blog = await blogCollection.find(query).toArray();
      res.json(blog);
    });

    app.post('/reviews/:serviceId', async (req, res) => {
      const response = await reviewsCollection.insertOne(req.body);
      res.json(response);
    });

    app.get('/reviews/:serviceId', async (req, res) => {
      const query = { service: req.params.serviceId };
      const reviews = await reviewsCollection.find(query).toArray();
      res.json(reviews);
    });

    app.delete('/reviews/:reviewId', async (req, res) => {
      const reviewId = req.params.reviewId;
      const query = { _id: ObjectId(reviewId) };
      const response = await reviewsCollection.deleteOne(query);
      res.json(response);
    });

    app.get('/reviews/user/:userEmail', async (req, res) => {
      const userEmail = req.params.userEmail;
      const query = { email: userEmail };
      const response = await reviewsCollection.find(query).toArray();
      res.json(response);
    });

    app.patch('/reviews/:reviewId', async (req, res) => {
      const reviewId = req.params.reviewId;
      const query = { _id: ObjectId(reviewId) };
      const updateDoc = {
        $set: {
          review: req.body.newReview,
        },
      };
      const response = await reviewsCollection.updateOne(query, updateDoc);
      res.json(response);
    });
  } finally {
  }
};

run().catch(error => console.error(error));

app.listen(port);
