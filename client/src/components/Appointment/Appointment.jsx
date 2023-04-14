import { useState } from 'react';
import Modal from 'react-modal';
import { DayPicker } from 'react-day-picker';
import styles from './Appointment.module.css';

const DEFAULT_SLOTS = [
  {
    id: 0,
    from: '9.30 AM',
    to: '10.30 AM',
  },
  {
    id: 1,
    from: '10.30 AM',
    to: '11.30 AM',
  },
  {
    id: 2,
    from: '11.30 AM',
    to: '12.30 PM',
  },
  {
    id: 3,
    from: '12.30 PM',
    to: '1.30 PM',
  },
  {
    id: 4,
    from: '1.30 PM',
    to: '2.30 PM',
  },
  {
    id: 5,
    from: '4.30 PM',
    to: '5.30 PM',
  },
  {
    id: 6,
    from: '5.30 AM',
    to: '6.30 AM',
  },
];

function Appointment({ isModalOpen, setIsModalOpen }) {
  const newAppointment = {
    doctorsId: '',
    patientsId: '',
    appointmentDate: '',
    appointmentTimeSlot: '',
    reasonsForVisit: '',
    appointmentStatus: '',
  };

  return (
    <Modal isOpen={isModalOpen}>
      <form>
        <div>
          <div>
            <label>Name</label>
            <input type="text" />
          </div>
          <div>
            <label>Age</label>
            <input type="number" />
          </div>
          <div>
            <label>Gender</label>
            <input type="text" />
          </div>
          <div>
            <label>Phone</label>
            <input type="number" />
          </div>
          <div>
            <label>Reasons For Visit</label>
            <textarea type="text" />
          </div>
        </div>
        <div>
          <DayPicker />
          {DEFAULT_SLOTS.map(({ id, from, to }) => (
            <p key={id}>{from + ' - ' + to}</p>
          ))}
        </div>
        <button type="submit">Book</button>
        <button onClick={() => setIsModalOpen(false)}>close</button>
      </form>
    </Modal>
  );
}

export default Appointment;
