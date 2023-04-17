import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true,
  },
  patient: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
    },
    phone: {
      type: String,
      required: true,
    },
  },
  appointmentDate: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => {
        return value > Date.now();
      },
      message: 'Appointment date must be in the future',
    },
  },
  appointmentTimeSlot: {
    id: {
      type: Number,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
  },
  reasonsForVisit: {
    type: String,
    required: true,
  },
  appointmentStatus: {
    type: String,
    required: true,
    enum: ['booked', 'canceled', 'complete'],
  },
});

export default mongoose.model('Appointment', AppointmentSchema);
