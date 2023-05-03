import { useState } from 'react';
import styles from './ReviewCard.module.css';
import { toast } from 'react-hot-toast';
import { AiFillStar } from 'react-icons/ai';
import { format } from 'date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../api/axios';
import ReviewCardDropdown from './ReviewCardDropdown';

const ReviewCard = ({
  _id,
  userName,
  userImgUrl,
  description,
  ratings,
  createdAt,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateDescription, setUpdatedDescription] = useState(description);

  const queryClient = useQueryClient();

  const { mutate: handleDelete } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axios.delete(`/reviews/${_id}`);

        if (data?.deletedCount > 0) {
          toast.success('Review deleted');
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    onSuccess: () => queryClient.invalidateQueries('reviews'),
  });

  const { mutate: handleSave } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axios.patch(`/reviews/${_id}`, {
          updateDescription,
        });

        if (data?.modifiedCount > 0) {
          toast.success('Review updated');
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsEditing(false);
      }
    },
    onSuccess: () => queryClient.invalidateQueries('reviews'),
  });

  return (
    <div className={styles.reviewCard}>
      <div className={styles.header}>
        <img className={styles.img} src={userImgUrl} alt={userName} />
        <div>
          <h3 className={styles.name}>{userName}</h3>
          <time>{format(new Date(createdAt), 'do MMM yyyy')}</time>
        </div>
        <ReviewCardDropdown
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      </div>
      {isEditing ? (
        <textarea
          className={styles.textarea}
          onChange={(event) => setUpdatedDescription(event.target.value)}
          value={updateDescription}
        />
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
    </div>
  );
};

export default ReviewCard;
