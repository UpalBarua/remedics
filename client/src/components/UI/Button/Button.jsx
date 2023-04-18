import React from 'react';
import styles from './Button.module.css';
import { Link } from 'react-router-dom';

const Button = ({ children, type, isLink, to, style, ...props }) => {
  if (isLink) {
    return (
      <Link className={styles.button} to={to} style={style} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles.button} data-type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
