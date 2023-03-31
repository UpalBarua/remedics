import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Form.module.css';
import { useSpinner } from '../../contexts/SpinnerContext';

const ERROR_MESSAGES = {
  'auth/wrong-password':
    'The password you entered is incorrect. Please try again.',
  'auth/user-not-found':
    'No account found with this email address. Please sign up first.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled':
    'Your account has been disabled. Please contact support.',
  UNKNOWN: 'An unexpected error occurred. Please try again later.',
};

const LoginForm = () => {
  const [loginError, setLoginError] = useState('');
  const { setIsSpinnerVisible } = useSpinner();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { logIn } = useAuth();

  const handleLogIn = async (event) => {
    event.preventDefault();
    setIsSpinnerVisible(true);

    const emailInput = emailRef.current.value;
    const passwordInput = passwordRef.current.value;

    try {
      const res = await logIn(emailInput, passwordInput);

      if (res?.user?.uid) {
        navigate(-1);
      }
    } catch (error) {
      const errorCode = error.code;
      console.log(`Login failed with error code: ${errorCode}`);
      const errorMessage = ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.UNKNOWN;
      setLoginError(errorMessage);
    } finally {
      setIsSpinnerVisible(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleLogIn}>
      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <input className={styles.input} type="text" ref={emailRef} />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Password</label>
        <input className={styles.input} type="password" ref={passwordRef} />
      </div>
      <button className="btn btn-primary" type="submit">
        Log In
      </button>
      {loginError && <p className={styles.errorMessage}>{loginError}</p>}
      {/* <p className={styles.errorMessage}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
        quos. Lorem, ipsum.
      </p> */}
    </form>
  );
};

export default LoginForm;
