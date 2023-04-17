import ServiceCard from './ServiceCard';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import styles from './Services.module.css';

const ServicesAll = () => {
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
    return (
      <div>
        <p>Loading...</p>
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
