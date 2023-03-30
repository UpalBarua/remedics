require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const servicesRoutes = require('./routes/services');
const reviewsRoutes = require('./routes/reviews');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/services', servicesRoutes);
app.use('/reviews', reviewsRoutes);

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
