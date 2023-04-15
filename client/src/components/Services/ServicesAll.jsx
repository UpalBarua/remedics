import { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import { useSpinner } from '../../contexts/SpinnerContext';
import { useQuery } from '@tanstack/react-query';
import styles from './Services.module.css';
import axios from '../../api/axios';

const ServicesAll = () => {
  const { setIsSpinnerVisible } = useSpinner();

  const {
    data: allServices = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['allServices'],
    queryFn: async () => {
      const res = await axios.get('/services');
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

  return (
    <section className={`container ${styles.services}`}>
      <h2 className="secondary-title text-accent-secondary">services</h2>
      <p className="primary-title">Lorem ipsum dolor sit amet consectetur</p>
      <div className={styles.grid}>
        {allServices?.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesAll;
