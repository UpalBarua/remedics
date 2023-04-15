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

  const uploadImage = async (imageData) => {
    if (!imageData) {
      throw new Error('No imageData provided to the uploadImage() function.');
    }

    const formData = new FormData();
    formData.append('image', imageData);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        formData
      );

      if (response.data.data.display_url) {
        console.log(response);
        return response.data.data.display_url;
      }

      throw new Error('Failed to upload image: No display URL returned.');
    } catch (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  };

  const createNewUser = async (newUserData) => {
    try {
      const res = await axios.post('http://localhost:3000/user/', newUserData);

      return res.data;
    } catch (error) {
      throw new Error(`Failed to create new user: ${error.message}`);
    }
  };

  const handleSignup = async ({ name, email, password }) => {
    const imageURL = await uploadImage(userImg);

    try {
      const response = await signUp(email, password);

      if (response?.user?.uid) {
        const newUser = await createNewUser({
          userName: name,
          email: email,
          picture: imageURL,
        });

        console.log(newUser);
      }
    } catch (error) {
      const errorCode = error.code;
      console.log(`Login failed with error code: ${errorCode}`);

      setAuthError(errorCode);
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
