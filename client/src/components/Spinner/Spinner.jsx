import React from 'react';
import { useSpinner } from '../../contexts/SpinnerContext';
import styles from './Spinner.module.css';

const Spinner = () => {
  const { isSpinnerVisible } = useSpinner();

  return (
    <section className={styles.overlay} data-visible={isSpinnerVisible}>
      <div className={styles.spinner}></div>
    </section>
  );
};

export default Spinner;
