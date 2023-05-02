import { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import styles from './Reviews.module.css';
import { toast, Toaster } from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AiFillStar } from 'react-icons/ai';
import axios from '../../api/axios';
import useUserData from '../../hooks/useUserData';
import Button from '../../components/UI/Button/Button';
import AddReview from './AddReview';

const Reviews = () => {
  const { serviceId } = useParams();

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const { data } = await axios.get(`/reviews/${serviceId}`);
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
    <section className={styles.grid}>
      <div className={styles.column}>
        <h2 className="secondary-title text-accent-secondary">
          Patient Feedback
        </h2>
        <AddReview serviceId={serviceId} />
      </div>
      <div className={styles.column}>
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            deleteReview={deleteReview}
            editReview={editReview}
            {...review}
          />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
