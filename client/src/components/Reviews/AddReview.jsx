import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import useUserData from '../../hooks/useUserData';
import { AiFillStar } from 'react-icons/ai';
import Button from '../UI/Button/Button';
import axios from '../../api/axios';
import { toast } from 'react-hot-toast';
import { MdAdd } from 'react-icons/md';
import styles from './AddReview.module.css';

const AddReview = ({ serviceId }) => {
  const [ratings, setRatings] = useState(0);
  const [description, setDescription] = useState('');

  const queryClient = useQueryClient();

  const { userData } = useUserData();

  const { mutate: handleReviewSubmit } = useMutation(
    async (event) => {
      event.preventDefault();

      const newReview = {
        serviceId,
        description,
        ratings,
        userName: userData?.userName,
        email: userData?.email,
        userImgUrl: userData?.imageUrl,
      };

      try {
        const res = await axios.post('/reviews', newReview);

        if (res.status === 201) {
          toast.success('Review Added');
          setDescription('');
          setRatings(0);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    },
    {
      onSuccess: () => queryClient.invalidateQueries(),
    }
  );

  return (
    <form className={styles.addReview} onSubmit={handleReviewSubmit}>
      <textarea
        className={styles.textarea}
        placeholder="Enter your feedback"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <div className={styles.footer}>
        <div className={styles.rating}>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={styles.ratingBtn}
                data-marked={index <= ratings}
                onClick={() => setRatings(index)}>
                <AiFillStar key={index} />
              </button>
            );
          })}
        </div>
        <Button disabled={!(description.length > 0 && ratings > 0)}>
          <MdAdd size={22} />
          <span>Add</span>
        </Button>
      </div>
    </form>
  );
};

export default AddReview;
