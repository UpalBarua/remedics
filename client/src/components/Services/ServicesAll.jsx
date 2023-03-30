import { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import { useSpinner } from '../../contexts/SpinnerContext';
import styles from './Services.module.css';

const ServicesAll = () => {
  const { setIsSpinnerVisible } = useSpinner();
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    setIsSpinnerVisible(true);

    (async () => {
      const response = await fetch('https://remedics.vercel.app/services');
      const data = await response.json();
      setServicesData(data);
      setIsSpinnerVisible(false);
    })();
  }, []);

  return (
    <section className={`container ${styles.services}`}>
      <h2 className="secondary-title text-accent-secondary">services</h2>
      <p className="primary-title">Lorem ipsum dolor sit amet consectetur</p>
      <div className={styles.grid}>
        {servicesData.map(service => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesAll;
