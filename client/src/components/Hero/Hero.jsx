import React from 'react';
import styles from './Hero.module.css';
import { Link } from 'react-router-dom';
import img from '../../assets/hero.svg';

const Hero = () => {
  return (
    <div className={`container ${styles.grid}`}>
      <div className={styles.column}>
        <h1 className={styles.title}>ReMedics</h1>
        <p className={styles.text}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque,
          natus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod,
          eligendi.
        </p>

        <div className={styles.btnGroup}>
          <Link className="btn btn-primary" to="/reviews">
            Reviews
          </Link>
          <Link className="btn btn-ghost" to="/blog">
            Blog
          </Link>
        </div>
      </div>
      <div className={styles.column}>
        <img className={styles.img} src={img} alt="" />
      </div>
    </div>
  );
};

export default Hero;
