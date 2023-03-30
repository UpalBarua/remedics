import useFormValidation from '../../hooks/useFormValidation';
import validateName from '../../utils/validateName';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import { useAuth } from '../../contexts/AuthContext';
import { useSpinner } from '../../contexts/SpinnerContext';
import styles from './Form.module.css';
import { useRef } from 'react';

const SignUpForm = () => {
  const { signUp, googleSignIn, updateUserProfile } = useAuth();
  const { setIsSpinnerVisible } = useSpinner();
  const imgRef = useRef();

  const {
    inputValue: nameValue,
    inputError: nameError,
    handleInputChange: handleNameChange,
    handleInputTouched: handleNameTouched,
  } = useFormValidation(validateName);

  const {
    inputValue: emailValue,
    inputError: emailError,
    handleInputChange: handleEmailChange,
    handleInputTouched: handleEmailTouched,
  } = useFormValidation(validateEmail);

  const {
    inputValue: passwordValue,
    inputError: passwordError,
    handleInputChange: handlePasswordChange,
    handleInputTouched: handleePasswordTouched,
  } = useFormValidation(validatePassword);

  const handleSignUp = async (event) => {
    event.preventDefault();
    setIsSpinnerVisible(true);

    try {
      const result = await signUp(emailValue, passwordValue);
      updateUserProfile(nameValue, imgRef.current.value);

      navigate(-1);
    } catch (error) {
      console.error(error);
    }

    setIsSpinnerVisible(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await googleSignIn();
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSignUp}>
      <div className={styles.field}>
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          type="text"
          onChange={handleNameChange}
          onBlur={handleNameTouched}
        />
        {nameError && <p className={styles.message}>{nameError}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Picture</label>
        <input className={styles.input} type="text" ref={imgRef} />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="text"
          onChange={handleEmailChange}
          onBlur={handleEmailTouched}
        />
        {emailError && <p className={styles.message}>{emailError}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          type="password"
          onChange={handlePasswordChange}
          onBlur={handleePasswordTouched}
        />
        {passwordError && <p className={styles.message}>{passwordError}</p>}
      </div>

      <button className="btn btn-primary" type="submit">
        Sign Up
      </button>
      <button className="btn btn-ghost" onClick={handleGoogleSignIn}>
        Sign Up with Google
      </button>
    </form>
  );
};

export default SignUpForm;
