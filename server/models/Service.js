const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 20,
    },
    description: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
      default: 0,
      min: 1,
      max: 5,
    },
    specialized: {
      type: String,
      required: true,
      // TODO: i could add a enum here.
    },
    fees: {
      type: Number,
      required: true,
      min: 100,
      max: 250,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Service', ServiceSchema);
