import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import styles from './Reviews.module.css';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import AddReview from './AddReview';

const Reviews = () => {
  const { serviceId } = useParams();

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['reviews', serviceId],
    queryFn: async () => {
      const { data } = await axios.get(`/reviews/${serviceId}`);
      return data;
    },
  });

  return (
    <section className={styles.grid}>
      <div className={styles.column}>
        <h2 className={styles.title}>Add Your Review</h2>
        <AddReview serviceId={serviceId} />
      </div>
      <div className={styles.column}>
        <h2 className={styles.title}>Patient Reviews</h2>
        {reviews.map((review) => (
          <ReviewCard key={review._id} {...review} />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
