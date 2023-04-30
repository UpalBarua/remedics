import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import useUserData from '../../hooks/useUserData';
import * as Dialog from '@radix-ui/react-dialog';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import 'react-day-picker/dist/style.css';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './Appointment.module.css';
import Button from '../../components/UI/Button/Button';
import TimeSlots from './TimeSlots';

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
      appointmentDate: new Date(appointmentDate).toISOString(),
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
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <div className={styles.header}>
            <Dialog.Title className={styles.modalTitle}>
              New Appointment
            </Dialog.Title>
            <Dialog.Close className={styles.closeBtn} asChild>
              <button>
                <AiOutlineClose />
              </button>
            </Dialog.Close>
          </div>
          <form
            className={styles.form}
            onSubmit={handleSubmit(handleNewAppointment)}>
            <div>
              <fieldset>
                <label>Name</label>
                <input
                  type="text"
                  defaultValue={userData?.userName}
                  {...register('name', {
                    required: { value: true, message: 'Name is required' },
                  })}
                />
              </fieldset>
              <fieldset>
                <label>Age</label>
                <input
                  type="number"
                  min={1}
                  max={120}
                  {...register('age', {
                    required: { value: true, message: 'Age is required' },
                  })}
                />
              </fieldset>
              <fieldset>
                <label>Gender</label>
                <input
                  type="text"
                  {...register('gender', {
                    required: { value: true, message: 'Name is required' },
                  })}
                />
              </fieldset>
              <fieldset>
                <label>Phone</label>
                <input
                  type="number"
                  {...register('phone', {
                    required: { value: true, message: 'Name is required' },
                  })}
                />
              </fieldset>
              <fieldset>
                <label>Reasons For Visit</label>
                <input
                  type="text"
                  {...register('reasonsForVisit', {
                    required: { value: true, message: 'Name is required' },
                  })}
                />
              </fieldset>
            </div>
            <div>
              <h2 className={styles.title}>Select Date</h2>
              <DayPicker
                className={styles.dayPicker}
                mode="single"
                selected={appointmentDate}
                onSelect={setAppointmentDate}
              />
              <h2 className={styles.title}>Select Time Slot</h2>
              <TimeSlots
                doctorId={doctorId}
                appointmentDate={appointmentDate}
                setAppointmentTimeSlot={setAppointmentTimeSlot}
              />
              <Button>book</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Appointment;
