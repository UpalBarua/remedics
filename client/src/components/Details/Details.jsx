import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSpinner } from '../../contexts/SpinnerContext';
import Reviews from '../Reviews/Reviews';
import styles from './Details.module.css';
import { AiOutlineStar } from 'react-icons/ai';
import { BiDollar } from 'react-icons/bi';
import { FiFlag } from 'react-icons/fi';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Details = () => {
  const { user } = useAuth();
  const { setIsSpinnerVisible } = useSpinner();
  const { serviceId } = useParams();

  const {
    data: serviceData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['serviceDetails'],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/services/${serviceId}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    setIsSpinnerVisible(true);
  } else {
    setIsSpinnerVisible(false);
  }

  if (isError) {
    return (
      <div>
        <p>Failed to load data.</p>
      </div>
    );
  }

  const { name, img, description, ratings, fees, specialized, country } =
    serviceData;

  return (
    <section className={`container ${styles.grid}`}>
      <div className={styles.column}>
        <img className={styles.img} src={img} alt={name} />
        <h2 className="primary-title">{name}</h2>
        <p className="secondary-title text-accent-primary">{specialized}</p>
        <div className={styles.stats}>
          <p>
            <AiOutlineStar className="text-accent-primary" />
            {ratings}
          </p>
          <p>
            <BiDollar className="text-accent-primary" />
            {fees}
          </p>
          <p>
            <FiFlag className="text-accent-primary" />
            {country}
          </p>
        </div>
        <p>{description}</p>
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
    </section>
  );
};

export default Details;
