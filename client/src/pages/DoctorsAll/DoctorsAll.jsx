import DoctorsCard from '../../components/Doctors/DoctorsCard';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import styles from './DoctorsAll.module.css';

const DoctorsAll = () => {
  const {
    data: allDoctors = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['allDoctors'],
    queryFn: async () => {
      const { data } = await axios.get('/services');
      return data;
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
    <section className={`container ${styles.doctors}`}>
      <h2 className="title--primary">Doctors</h2>
      <p className="title--secondary">Lorem ipsum dolor sit amet consectetur</p>
      <ul className={styles.doctorsCards}>
        {allDoctors.map((doctor) => (
          <DoctorsCard key={doctor._id} {...doctor} />
        ))}
      </ul>
    </section>
  );
};

export default DoctorsAll;
