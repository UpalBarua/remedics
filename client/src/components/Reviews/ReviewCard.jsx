import { useState, useRef } from 'react';
import styles from './ReviewCard.module.css';
import { toast } from 'react-hot-toast';

const ReviewCard = ({ data, deleteReview, editReview }) => {
  const { _id, name, review, email, img } = data;
  const [isEditing, setIsEditing] = useState(false);
  const reviewRef = useRef();

  const handleDelete = () => {
    fetch(`http://localhost:3000/reviews/${_id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          deleteReview(_id);
          toast('Review Deleted', {
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
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const newReview = reviewRef.current.value;

    fetch(`http://localhost:3000/reviews/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newReview }),
    })
      .then((response) => response.json())
      .then((data) => {
        editReview(_id, newReview);
        if (data.modifiedCount > 0) {
          toast('Review Edited', {
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
      });

    setIsEditing(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.user}>
        <img className={styles.img} src={img} alt={name} />
        <div>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.email}>{email}</p>
        </div>
      </div>
      {isEditing ? (
        <textarea
          className={styles.textarea}
          ref={reviewRef}
          defaultValue={review}></textarea>
      ) : (
        <p>{review}</p>
      )}
      <div className={styles.btnGroup}>
        {isEditing ? (
          <button className={styles.btn} onClick={handleSave}>
            save
          </button>
        ) : (
          <button className={styles.btn} onClick={handleEdit}>
            Edit
          </button>
        )}
        <button className={styles.btn} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
