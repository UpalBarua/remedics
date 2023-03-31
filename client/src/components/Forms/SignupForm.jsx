import { useAuth } from '../../contexts/AuthContext';
import { useSpinner } from '../../contexts/SpinnerContext';
import { AiOutlineUser } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import styles from './Form.module.css';
import { useState } from 'react';
import axios from 'axios';

const SignupForm = ({ setAuthError }) => {
  const { signUp, updateUserProfile } = useAuth();
  const { setIsSpinnerVisible } = useSpinner();
  const [userImg, setUserImg] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async ({ name, email, password }) => {
    setIsSpinnerVisible(true);
    let img = '';

    const formData = new FormData();
    formData.append('image', userImg);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        formData
      );

      if (res.data.data.display_url) {
        img = res.data.data.display_url;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const res = await signUp(email, password);

      if (res?.user?.uid) {
        updateUserProfile(name, img);
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
    <form className={styles.form} onSubmit={handleSubmit(handleSignup)}>
      <input
        type="file"
        onChange={(event) => setUserImg(event.target.files[0])}
      />
      <div className={styles.field}>
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          type="text"
          {...register('name', {
            required: {
              value: true,
              message: 'Name is required.',
            },
            pattern: {
              value: /^[a-z ,.'-]+$/i,
              message: 'Not a valid name',
            },
            maxLength: {
              value: 50,
              message: 'Name is too long',
            },
            minLength: {
              value: 2,
              message: 'Name is too short',
            },
          })}
        />
        {errors.name && <p className={styles.message}>{errors.name.message}</p>}
      </div>
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
            // minLength: {
            //   value: 8,
            //   message: 'Password to short',
            // },
            // maxLength: {
            //   value: 64,
            //   message: 'Password to long',
            // },
            // pattern: {
            //   value: /(?=.*?[A-Z])/,
            //   message: 'Password needs at least one upper case letter.',
            // },
            // pattern: {
            //   value: /(?=.*?[a-z])/,
            //   message: 'Password needs at least one lower case letter.',
            // },
            // pattern: {
            //   value: /(?=.*?[0-9])/,
            //   message: 'Password needs at least one digit.',
            // },
            // pattern: {
            //   value: /(?=.*?[#?!@$%^&*-])/,
            //   message: 'Password needs at least one special character.',
            // },
          })}
        />
        {errors.password && (
          <p className={styles.message}>{errors.password.message}</p>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
