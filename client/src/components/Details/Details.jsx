import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';

import { useAuth } from '../../contexts/AuthContext';
import Reviews from '../Reviews/Reviews';
import Appointment from '../Appointment/Appointment';

import {
  AiOutlineCalendar,
  AiFillDollarCircle,
  AiFillClockCircle,
  AiFillStar,
} from 'react-icons/ai';

import styles from './Details.module.css';

const Details = () => {
  const { user } = useAuth();
  const { serviceId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: serviceDetails = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['serviceDetails'],
    queryFn: async () => {
      const { data } = await axios.get(`/services/${serviceId}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div>
        <p>Loading data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Failed to load data.</p>
      </div>
    );
  }

  const {
    _id: doctorId,
    name,
    img,
    description,
    ratings,
    fees,
    specialized,
    country,
  } = serviceDetails;

  return (
    <section className={`container ${styles.grid}`}>
      <div className={styles.column}>
        <div className={styles.information}>
          <img className={styles.img} src={img} alt={name} />
          <h2 className={styles.name}>{name}</h2>
          <p>
            MBBS, MD, D.Litt - Honoris Causa Chariman and Cheif - Cardiology 38
            Years practice 4 awards
          </p>
          <div className={styles.stats}>
            <p>
              <AiFillStar className={styles.icon} />
              {ratings}/5
            </p>
            <p>
              <AiFillDollarCircle className={styles.icon} />
              {fees}
            </p>
            <p>
              <AiFillClockCircle className={styles.icon} />4 years
            </p>
          </div>
        </div>
        <div className={styles.appointment}>
          <h2>Appointment</h2>
          <div className={styles.appointmentGrid}>
            <div>
              <p>Fortis Escorts Heart Institute, Okhla Road</p>
              <p>Okhla Rd, New Friends Colony, New Delhi, Delhi 110025</p>
            </div>
            <button
              className={styles.appointmentBtn}
              onClick={() => setIsModalOpen(true)}>
              <AiOutlineCalendar />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
        <div className={styles.introduction}>
          <h2>Introduction</h2>
          <p>{description?.slice(0, 500)}</p>
        </div>
        <div className={styles.education}>
          <h2>Education</h2>
          <p>{description?.slice(0, 500)}</p>
        </div>
      </div>
      {user ? (
        <div className={styles.column}>
          <Reviews />
        </div>
      ) : (
        <h2 className="primary-title">
          <Link className={styles.login} to="/login">
            Login
          </Link>{' '}
          to add review!
        </h2>
      )}
      <Appointment
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        doctorId={doctorId}
      />
    </section>
  );
};

export default Details;
