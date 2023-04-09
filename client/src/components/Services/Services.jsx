import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSpinner } from '../../contexts/SpinnerContext';
import ServiceCard from './ServiceCard';
import styles from './Services.module.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Services = () => {
  const { setIsSpinnerVisible } = useSpinner();

  const {
    data: services = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/services?limit=3');
      return res.data;
    },
  });

  return (
    <section className={`container ${styles.services}`}>
      <h2 className={styles.titleSm}>Doctors</h2>
      <p className="primary-title">Find top doctors for your medical needs. </p>

      <div className={styles.grid}>
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>

      {/* <Link className={`btn btn-ghost ${styles.allBtn}`} to="/services">
        View All
      </Link> */}
    </section>
  );
};

export default Services;
