import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className="container">
          <h2 className="logo">ReMedics</h2>
          <p>copyright &copy; 2022</p>
        </div>
      </footer>
      <div className={styles.gradient}></div>
    </>
  );
};

export default Footer;
