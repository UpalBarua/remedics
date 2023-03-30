import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSpinner } from '../../contexts/SpinnerContext';
import { json, useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import styles from './Reviews.module.css';
import { toast, Toaster } from 'react-hot-toast';

const Reviews = () => {
  const { user } = useAuth();
  const { setIsSpinnerVisible } = useSpinner();
  const [reviewsData, setReviewsData] = useState([]);
  const { serviceId } = useParams();
  const reviewRef = useRef();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3000/reviews/${serviceId}`
      );
      const data = await response.json();
      setReviewsData(data);
    })();
  }, []);

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    setIsSpinnerVisible(true);

    const review = {
      service: serviceId,
      name: user.displayName,
      email: user.email,
      review: reviewRef.current.value,
    };

    fetch(`http://localhost:3000/reviews/${serviceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.acknowledged) {
          setReviewsData((prevReviewsData) => [review, ...prevReviewsData]);
          toast('Review Added', {
            icon: '✅',
            style: {
              borderRadius: '10px',
              background: 'var(--clr-dark-500)',
              color: '#fff',
              marginTop: '5rem',
              fontSize: '1.125rem',
            },
          });
        }
        setIsSpinnerVisible(false);
      });
  };

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
        <h2 className="secondary-title text-accent-secondary">Review</h2>
        <form onSubmit={handleReviewSubmit}>
          <textarea ref={reviewRef} className={styles.textarea}></textarea>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className={styles.column}>
        {reviewsData.map((data) => (
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
