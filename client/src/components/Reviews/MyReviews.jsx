import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ReviewCard from './ReviewCard';
import styles from './MyReviews.module.css';
import { useSpinner } from '../../contexts/SpinnerContext';
import useTitle from '../../hooks/useTitle';
import { Toaster } from 'react-hot-toast';

const MyReviews = () => {
  useTitle('My Reviews');
  const { user } = useAuth();
  const { setIsSpinnerVisible } = useSpinner();
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    setIsSpinnerVisible(true);

    (async () => {
      const response = await fetch(
        `http://localhost:3000/reviews/user/${user.email}`
      );
      const data = await response.json();
      setReviewsData(data);
      setIsSpinnerVisible(false);
    })();
  }, []);

  const deleteReview = (id) => {
    setReviewsData((prevReviewsData) =>
      prevReviewsData.filter((data) => data._id !== id)
    );
  };

  const editReview = (id, review) => {
    setReviewsData((prevReviewsData) => {
      const remaining = prevReviewsData.filter((data) => data._id !== id);
      const modified = prevReviewsData.find((data) => data._id === id);
      modified.review = review;
      return [modified, ...remaining];
    });
  };

  return (
    <section className={`container ${styles.myReviews}`}>
      <h2 className="secondary-title text-accent-secondary">reviews</h2>
      <p className="primary-title">see all of the reviews that you submitted</p>
      <div className={styles.grid}>
        {reviewsData.length > 0 ? (
          reviewsData.map((data) => (
            <ReviewCard
              key={data._id}
              data={data}
              deleteReview={deleteReview}
              editReview={editReview}
            />
          ))
        ) : (
          <h2 className={styles.text}>No Reviews Added</h2>
        )}
      </div>
      <Toaster />
    </section>
  );
};

export default MyReviews;
