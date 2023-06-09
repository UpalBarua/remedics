import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import createNewUser from '../../utils/createNewUser';
import uploadImage from '../../utils/uploadImage';
import Button from '../UI/Button/Button';
import styles from './Form.module.css';

const SignupForm = ({ setAuthError, setIsLoading }) => {
  const [userImg, setUserImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userImg) {
      return setImgPreview(null);
    }

    const objectURL = URL.createObjectURL(userImg);
    setImgPreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [userImg]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async ({ name, email, password }) => {
    setIsLoading(true);
    const imageUrl = await uploadImage(userImg);

    try {
      const response = await signUp(email, password);

      if (response?.user?.uid) {
        await createNewUser({
          userName: name,
          email,
          imageUrl,
        });
      }

      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      console.log(`Login failed with error code: ${errorCode}`);

      setAuthError(errorCode);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleSignup)}>
      <div className={styles.imgUpload}>
        <img
          className={styles.imgPreview}
          src={
            imgPreview
              ? imgPreview
              : 'https://freesvg.org/img/abstract-user-flat-4.png'
          }
        />
        <input
          type="file"
          onChange={(event) => setUserImg(event.target.files[0])}
        />
      </div>
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
      <Button>Sign Up</Button>
    </form>
  );
};

export default SignupForm;
