import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    userImgUrl: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Review', ReviewSchema);
