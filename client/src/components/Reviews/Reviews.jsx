import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSpinner } from '../../contexts/SpinnerContext';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import styles from './Reviews.module.css';
import { toast, Toaster } from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const Reviews = () => {
  const queryClient = useQueryClient();

  const { user } = useAuth();
  const { setIsSpinnerVisible } = useSpinner();
  const { serviceId } = useParams();
  const reviewRef = useRef();

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/reviews/${serviceId}`);
      return res.data;
    },
  });

  const { mutate: handleReviewSubmit } = useMutation(
    async (event) => {
      event.preventDefault();
      setIsSpinnerVisible(true);

      const review = {
        service: serviceId,
        name: user.displayName,
        email: user.email,
        review: reviewRef.current.value,
      };

      const res = await axios.post('http://localhost:3000/reviews/', review);

      if (res.status === 201) {
        toast('Review Added', {
          icon: '✅',
          style: {
            borderRadius: '10px',
            background: 'var(--color-dark-500)',
            color: '#fff',
            marginTop: '5rem',
            fontSize: '1.125rem',
          },
        });
      }

      setIsSpinnerVisible(false);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(),
    }
  );

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
        <form onSubmit={handleReviewSubmit}>
          <textarea ref={reviewRef} className={styles.textarea}></textarea>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className={styles.column}>
        {reviews.map((data) => (
          <ReviewCard
            key={data._id}
            data={data}
            deleteReview={deleteReview}
            editReview={editReview}
          />
        ))}
      </div>
      <Toaster />
    </section>
  );
};

export default Reviews;
