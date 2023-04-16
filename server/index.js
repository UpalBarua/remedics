import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { servicesRoutes } from './routes/services.js';
import { reviewsRoutes } from './routes/reviews.js';
import { userRoutes } from './routes/user.js';

dotenv.config();

const port = process.env.PORT || 3000;
const uri = process.env.DB_URI || '';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/services', servicesRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('server is running...');
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  })
  .catch((error) => console.log(error));
