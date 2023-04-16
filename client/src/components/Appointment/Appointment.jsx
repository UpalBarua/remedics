import { useState } from 'react';
import Modal from 'react-modal';
import { DayPicker } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import useUserData from '../../hooks/useUserData';
import styles from './Appointment.module.css';

const DEFAULT_SLOTS = [
  {
    id: 0,
    from: new Date().setHours(9, 30),
    to: new Date().setHours(10, 30),
  },
  {
    id: 1,
    from: new Date().setHours(10, 30),
    to: new Date().setHours(11, 30),
  },
  {
    id: 2,
    from: new Date().setHours(11, 30),
    to: new Date().setHours(12, 30),
  },
  {
    id: 3,
    from: new Date().setHours(12, 30),
    to: new Date().setHours(13, 30),
  },
  {
    id: 4,
    from: new Date().setHours(13, 30),
    to: new Date().setHours(14, 30),
  },
  {
    id: 5,
    from: new Date().setHours(16, 30),
    to: new Date().setHours(17, 30),
  },
  {
    id: 6,
    from: new Date().setHours(5, 30),
    to: new Date().setHours(6, 30),
  },
];

function Appointment({ isModalOpen, setIsModalOpen, doctorId }) {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTimeSlot, setAppointmentTimeSlot] = useState(null);

  const { userData } = useUserData();
  // let userData = { userName: 'upal' };

  const { register, handleSubmit } = useForm();

  const handleNewAppointment = async ({
    name,
    age,
    gender,
    phone,
    reasonsForVisit,
  }) => {
    const newAppointment = {
      doctorId,
      patient: {
        id: '',
        name,
        age,
        gender,
        phone,
      },
      appointmentDate,
      appointmentTimeSlot,
      reasonsForVisit,
      appointmentStatus: 'pending',
    };

    console.log(newAppointment);
  };

  return (
    <Modal isOpen={isModalOpen} className={styles.modal}>
      <form
        className={styles.appointmentForm}
        onSubmit={handleSubmit(handleNewAppointment)}>
        <div>
          <div>
            <label>Name</label>
            <input
              type="text"
              defaultValue={userData?.userName}
              {...register('name', {
                required: { value: true, message: 'Name is required' },
              })}
            />
          </div>
          <div>
            <label>Age</label>
            <input
              type="number"
              {...register('age', {
                required: { value: true, message: 'Name is required' },
              })}
            />
          </div>
          <div>
            <label>Gender</label>
            <input
              type="text"
              {...register('gender', {
                required: { value: true, message: 'Name is required' },
              })}
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="number"
              {...register('phone', {
                required: { value: true, message: 'Name is required' },
              })}
            />
          </div>
          <div>
            <label>Reasons For Visit</label>
            <textarea
              type="text"
              {...register('reasonsForVisit', {
                required: { value: true, message: 'Name is required' },
              })}
            />
          </div>
        </div>
        <div>
          <DayPicker
            mode="single"
            selected={appointmentDate}
            onSelect={setAppointmentDate}
          />
          <div>
            {DEFAULT_SLOTS.map((slot) => (
              <label key={slot.id}>
                <input
                  type="radio"
                  name="timeSlot"
                  value={slot}
                  onChange={() => setAppointmentTimeSlot(slot)}
                />
                {slot.to + ' ' + slot.from}
              </label>
            ))}
          </div>
        </div>
        <button type="submit">Book</button>
        <button onClick={() => setIsModalOpen(false)}>close</button>
      </form>
    </Modal>
  );
}

export default Appointment;
