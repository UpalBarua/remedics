import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import useUserData from '../../hooks/useUserData';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './Appointment.module.css';
import { format } from 'date-fns';
import axios from '../../api/axios';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

function Appointment({ isModalOpen, setIsModalOpen, doctorId }) {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTimeSlot, setAppointmentTimeSlot] = useState(null);

  const { register, handleSubmit } = useForm();
  const { userData } = useUserData();

  const {
    data: timeSlots = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['timeSlots', doctorId, appointmentDate],
    queryFn: async () => {
      const { data } = await axios.get(
        `/appointments/time-slots?doctorId=${doctorId}&appointmentDate=${appointmentDate}`
      );
      return data;
    },
  });

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
                {isLoading ? (
                  <p>time slots loading...</p>
                ) : (
                  timeSlots.map((slot) => (
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
                  ))
                )}
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
