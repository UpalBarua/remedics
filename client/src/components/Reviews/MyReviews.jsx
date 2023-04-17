import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ReviewCard from './ReviewCard';
import styles from './MyReviews.module.css';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';

const MyReviews = () => {
  const { user } = useAuth();

  const { data: myReviews } = useQuery({
    queryKey: ['myReviews'],
    queryFn: async () => {
      const { data } = await axios.get(`/reviews/user/${user.email}`);
      return data;
    },
  });

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
        {myReviews?.length > 0 ? (
          myReviews.map((data) => (
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
    </section>
  );
};

export default MyReviews;
