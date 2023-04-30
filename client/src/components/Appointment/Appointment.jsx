import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import useUserData from '../../hooks/useUserData';
import * as Dialog from '@radix-ui/react-dialog';
import toast from 'react-hot-toast';
import axios from '../../api/axios';
import 'react-day-picker/dist/style.css';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './Appointment.module.css';
import Button from '../../components/UI/Button/Button';
import TimeSlots from './TimeSlots';

function Appointment({ isModalOpen, setIsModalOpen, doctorId }) {
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTimeSlot, setAppointmentTimeSlot] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
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
        reset();
        setIsModalOpen(false);
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
        <Dialog.Content className={styles.content} onCloseAutoFocus={reset}>
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
                    required: {
                      value: true,
                      message: 'Name is required.',
                    },
                    pattern: {
                      value: /^[a-z ,.'-]+$/i,
                      message: 'Not a valid name',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Name is too long',
                    },
                    minLength: {
                      value: 2,
                      message: 'Name is too short',
                    },
                    type: 'string',
                  })}
                />
                {errors.name && (
                  <p className={styles.message}>{errors.name.message}</p>
                )}
              </fieldset>
              <fieldset>
                <label>Age</label>
                <input
                  type="number"
                  min={1}
                  max={120}
                  {...register('age', {
                    required: { value: true, message: 'Age is required' },
                    min: {
                      value: 1,
                      message: 'You must be at least 1 years old',
                    },
                    max: {
                      value: 120,
                      message: 'You cannot be older than 120 years',
                    },
                  })}
                />
                {errors.age && (
                  <p className={styles.message}>{errors.age.message}</p>
                )}
              </fieldset>
              <fieldset>
                <label>Gender</label>
                <input
                  type="text"
                  {...register('gender', {
                    required: { value: true, message: 'Gender is required' },
                  })}
                />
                {errors.gender && (
                  <p className={styles.message}>{errors.gender.message}</p>
                )}
              </fieldset>
              <fieldset>
                <label>Phone</label>
                <input
                  type="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9 ()+-]+$/,
                      message: 'Invalid phone number format',
                    },
                    minLength: {
                      value: 10,
                      message: 'Phone number must be at least 10 digits long',
                    },
                    maxLength: {
                      value: 15,
                      message:
                        'Phone number cannot be more than 15 digits long',
                    },
                  })}
                />
                {errors.phone && (
                  <p className={styles.message}>{errors.phone.message}</p>
                )}
              </fieldset>
              <fieldset>
                <label>Reasons For Visit</label>
                <input
                  type="text"
                  {...register('reasonsForVisit', {
                    required: {
                      value: true,
                      message: 'Reasons for visit is required',
                    },
                  })}
                />
                {errors.reasonsForVisit && (
                  <p className={styles.message}>
                    {errors.reasonsForVisit.message}
                  </p>
                )}
              </fieldset>
            </div>
            <div>
              <h2 className={styles.title}>Select Date And Time</h2>
              <DayPicker
                className={styles.dayPicker}
                mode="single"
                selected={appointmentDate}
                onSelect={setAppointmentDate}
              />
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
