import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Form.module.css';
import { useSpinner } from '../../contexts/SpinnerContext';
import { useForm } from 'react-hook-form';

const LoginForm = ({ setAuthError }) => {
  const { setIsSpinnerVisible } = useSpinner();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { logIn } = useAuth();

  const handleLogIn = async ({ email, password }) => {
    setIsSpinnerVisible(true);

    try {
      const res = await logIn(email, password);

      if (res?.user?.uid) {
        navigate(-1);
      }
    } catch (error) {
      const errorCode = error.code;
      console.log(`Login failed with error code: ${errorCode}`);

      setAuthError(errorCode);
    } finally {
      setIsSpinnerVisible(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleLogIn)}>
      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="text"
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required.',
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Not a valid email',
            },
          })}
        />
        {errors.email && (
          <p className={styles.message}>{errors.email.message}</p>
        )}
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          type="password"
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required.',
            },
          })}
        />
        <p className={styles.message}>{errors.password?.message || ''}</p>
      </div>
      <button className="btn btn-primary" type="submit">
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
