import { useQuery } from '@tanstack/react-query';
import format from 'date-fns/format';
import axios from '../../api/axios';
import styles from './TimeSlot.module.css';

const TimeSlots = ({ doctorId, appointmentDate, setAppointmentTimeSlot }) => {
  const {
    data: timeSlots = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['timeSlots', doctorId, appointmentDate],
    queryFn: async () => {
      const { data } = await axios.get(
        `/appointments/time-slots?doctorId=${doctorId}&appointmentDate=${new Date(
          appointmentDate
        ).toISOString()}`
      );

      return data;
    },
  });

  return (
    <div className={styles.timeSlots}>
      {isLoading ? (
        <p>time slots loading...</p>
      ) : (
        timeSlots.map((slot) => (
          <div className={styles.slot} key={slot.id}>
            <input
              id={slot.id}
              type="radio"
              name="timeSlot"
              value={slot}
              onChange={() => setAppointmentTimeSlot(slot)}
            />
            <label htmlFor={slot.id}>{`${format(slot.to, 'hh.mma')}`}</label>
          </div>
        ))
      )}
    </div>
  );
};

export default TimeSlots;
