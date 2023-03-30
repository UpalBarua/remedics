import React from 'react';
import styles from './Download.module.css';
import img from '../../assets/download.svg';

const Download = () => {
  return (
    <section className={`container ${styles.grid}`}>
      <div className={styles.column}>
        <img className={styles.img} src={img} alt="" />
      </div>
      <div className={styles.column}>
        <h2 className="secondary-title text-accent-secondary">app</h2>
        <p className="primary-title">download our app for your phone</p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, in?
          Lorem, ipsum dolor
        </p>
        <button className="btn btn-primary">download</button>
      </div>
    </section>
  );
};

export default Download;
