import { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import { useSpinner } from '../../contexts/SpinnerContext';
import axios from 'axios';
import styles from './Services.module.css';

const ServicesAll = () => {
  const { setIsSpinnerVisible } = useSpinner();
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    setIsSpinnerVisible(true);

    const fetchAllServices = async () => {
      const response = await axios.get('http://localhost:3000/services');
      setServicesData(response.data);
      setIsSpinnerVisible(false);
    };

    fetchAllServices();
  }, []);

  return (
    <section className={`container ${styles.services}`}>
      <h2 className="secondary-title text-accent-secondary">services</h2>
      <p className="primary-title">Lorem ipsum dolor sit amet consectetur</p>
      <div className={styles.grid}>
        {servicesData.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesAll;
