import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import DoctorCard from './DoctorsCard';
import styles from './Doctors.module.css';

const Doctors = () => {
  const {
    data: doctors = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      const { data } = await axios.get('/services?limit=3');
      return data;
    },
  });

  if (isLoading) {
    return <p>Loading doctors...</p>;
  }

  if (isError) {
    return <p>Failed to load doctors...</p>;
  }

  return (
    <section className={`${styles.doctors} container`}>
      <h2 className="title--primary">Doctors</h2>
      <p className="title--secondary">
        Find top doctors for your medical needs
      </p>
      <ul className={styles.cards}>
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} {...doctor} />
        ))}
      </ul>
    </section>
  );
};

export default Doctors;
