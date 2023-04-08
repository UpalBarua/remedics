import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSpinner } from '../../contexts/SpinnerContext';
import ServiceCard from './ServiceCard';
import styles from './Services.module.css';

const Services = () => {
  const [servicesData, setServicesData] = useState([]);
  const { setIsSpinnerVisible } = useSpinner();

  useEffect(() => {
    setIsSpinnerVisible(true);

    (async () => {
      const response = await fetch('http://localhost:3000/services?limit=3');
      const data = await response.json();
      setServicesData(data);
      setIsSpinnerVisible(false);
    })();
  }, []);

  return (
    <section className={`container ${styles.services}`}>
      <h2 className={styles.titleSm}>Doctors</h2>
      <p className="primary-title">Find top doctors for your medical needs. </p>

      <div className={styles.grid}>
        {servicesData.map((service) => (
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
