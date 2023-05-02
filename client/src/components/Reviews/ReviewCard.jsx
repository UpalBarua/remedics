import { useState, useRef } from 'react';
import styles from './ReviewCard.module.css';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { format } from 'date-fns';

const ReviewCard = ({
  _id,
  userName,
  email,
  userImgUrl,
  description,
  deleteReview,
  editReview,
  ratings,
  createdAt,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const reviewRef = useRef();

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/reviews/${_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          deleteReview(_id);
          toast('Review Deleted', {
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
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const newReview = reviewRef.current.value;

    axios
      .patch(`http://localhost:3000/reviews/${_id}`, newReview)
      .then((response) => response.json())
      .then((data) => {
        editReview(_id, newReview);
        if (data.modifiedCount > 0) {
          toast('Review Edited', {
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
      });

    setIsEditing(false);
  };

  return (
    <div className={styles.reviewCard}>
      <div className={styles.header}>
        <img className={styles.img} src={userImgUrl} alt={userName} />
        <div>
          <h3 className={styles.name}>{userName}</h3>
          <time>{format(new Date(createdAt), 'do MMM yyyy')}</time>
        </div>
        <button>
          <BsThreeDots size={25} />
        </button>
      </div>
      {isEditing ? (
        <textarea
          className={styles.textarea}
          ref={reviewRef}
          defaultValue={description}></textarea>
      ) : (
        <>
          <div className={styles.rating}>
            {[...Array(5)].map((star = 5, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={styles.ratingBtn}
                  data-marked={index <= ratings}>
                  <AiFillStar key={index} />
                </button>
              );
            })}
          </div>
          <p>{description}</p>
        </>
      )}
      {/* <div className={styles.btnGroup}>
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
      </div> */}
    </div>
  );
};

export default ReviewCard;
