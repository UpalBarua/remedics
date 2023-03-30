import React, { useRef } from 'react';
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import useTitle from '../../hooks/useTitle';
import styles from './Form.module.css';
import { useSpinner } from '../../contexts/SpinnerContext';

const LogInForm = () => {
  const { setIsSpinnerVisible } = useSpinner();
  const navigate = useNavigate();
  const { state } = useLocation();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  useTitle('TITLE | Login');

  const { logIn } = useAuth();

  const handleLogIn = async event => {
    event.preventDefault();
    setIsSpinnerVisible(true);
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    try {
      const response = await logIn(emailValue, passwordValue);
      // navigate(state.prev);
      navigate(-1);
      setIsSpinnerVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleLogIn}>
      <div className={styles.wrapper}>
        <label className={styles.label}>Email</label>
        <input className={styles.input} type="text" ref={emailRef} />
      </div>

      <div className={styles.wrapper}>
        <label className={styles.label}>Password</label>
        <input className={styles.input} type="password" ref={passwordRef} />
      </div>
      <button className="btn btn-primary" type="submit">
        Log In
      </button>
    </form>
  );
};

export default LogInForm;
