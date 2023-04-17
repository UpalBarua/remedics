import { useState } from 'react';
import Modal from 'react-modal';
import { DayPicker } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import useUserData from '../../hooks/useUserData';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './Appointment.module.css';
import { format } from 'date-fns';
import axios from '../../api/axios';
import toast from 'react-hot-toast';

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

  const { register, handleSubmit } = useForm();
  const { userData } = useUserData();

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
        id: userData?._id,
        name,
        age,
        gender,
        phone,
      },
      appointmentDate,
      appointmentTimeSlot,
      reasonsForVisit,
      appointmentStatus: 'booked',
    };

    try {
      const res = await axios.post('/appointments', newAppointment);
      if (res.status === 201) {
        toast.success('Appointment booked!');
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content className={styles.dialogContent}>
          <Dialog.Title className={styles.dialogTitle}>
            New Appointment
          </Dialog.Title>
          <form
            className={styles.appointmentForm}
            onSubmit={handleSubmit(handleNewAppointment)}>
            <div className={styles.column}>
              <fieldset className={styles.fieldset}>
                <label className={styles.label}>Name</label>
                <input
                  className={styles.input}
                  type="text"
                  defaultValue={userData?.userName}
                  {...register('name', {
                    required: { value: true, message: 'Name is required' },
                  })}
                />
              </fieldset>
              <fieldset className={styles.fieldset}>
                <label className={styles.label}>Age</label>
                <input
                  className={styles.input}
                  type="number"
                  {...register('age', {
                    required: { value: true, message: 'Name is required' },
                  })}
                />
              </fieldset>
              <fieldset className={styles.fieldset}>
                <label className={styles.label}>Gender</label>
                <input
                  className={styles.input}
                  type="text"
                  {...register('gender', {
                    required: { value: true, message: 'Name is required' },
                  })}
                />
              </fieldset>
              <fieldset className={styles.fieldset}>
                <label className={styles.label}>Phone</label>
                <input
                  className={styles.input}
                  type="number"
                  {...register('phone', {
                    required: { value: true, message: 'Name is required' },
                  })}
                />
              </fieldset>
              <fieldset className={styles.fieldset}>
                <label className={styles.label}>Reasons For Visit</label>
                <input
                  className={styles.input}
                  type="text"
                  {...register('reasonsForVisit', {
                    required: { value: true, message: 'Name is required' },
                  })}
                />
              </fieldset>
            </div>
            <div className={styles.column}>
              <DayPicker
                className={styles.dayPicker}
                mode="single"
                selected={appointmentDate}
                onSelect={setAppointmentDate}
              />
              <div className={styles.timeSlotContainer}>
                {DEFAULT_SLOTS.map((slot) => (
                  <label key={slot.id} className={styles.timeSlot}>
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot}
                      onChange={() => setAppointmentTimeSlot(slot)}
                    />
                    {`${format(slot.to, 'hh.mma')}
`}
                  </label>
                ))}
              </div>
            </div>
            <button type="submit">Book</button>
            <button onClick={() => setIsModalOpen(false)}>close</button>
          </form>
          <Dialog.Close asChild>
            <button>Save changes</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Appointment;
