import { useRef } from 'react';
import styles from './Form.module.css';
import { toast } from 'react-hot-toast';
import { useSpinner } from '../../contexts/SpinnerContext';
import axios from 'axios';

const AddServiceForm = () => {
  const { setIsSpinnerVisible } = useSpinner();

  const nameRef = useRef();
  const ratingsRef = useRef();
  const descriptionRef = useRef();
  const specializedRef = useRef();
  const feesRef = useRef();
  const countryRef = useRef();
  const imgRef = useRef();

  const handleServiceSubmit = (event) => {
    event.preventDefault();
    setIsSpinnerVisible(true);

    const newService = {
      name: nameRef.current.value,
      ratings: ratingsRef.current.value,
      description: descriptionRef.current.value,
      specialized: specializedRef.current.value,
      fees: feesRef.current.value,
      country: countryRef.current.value,
      img: imgRef.current.value,
    };

    axios
      .post('http://localhost:3000/services', newService)
      .then((response) => response.json())
      .then((data) => {
        if (data.acknowledged) {
          toast('Doctor Added', {
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

  return (
    <form className={styles.form} onSubmit={handleServiceSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>Name</label>
        <input className={styles.input} type="text" ref={nameRef} />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Picture</label>
        <input className={styles.input} type="text" ref={imgRef} />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>specialized</label>
        <input className={styles.input} type="text" ref={specializedRef} />
      </div>
      <div className={styles.stats}>
        <div className={styles.field}>
          <label className={styles.label}>Ratings</label>
          <input
            className={styles.input}
            type="number"
            ref={ratingsRef}
            max="5"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Fees</label>
          <input className={styles.input} type="number" ref={feesRef} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Country</label>
          <input className={styles.input} type="text" ref={countryRef} />
        </div>
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Description</label>
        <textarea className={styles.textarea} ref={descriptionRef}></textarea>
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AddServiceForm;
