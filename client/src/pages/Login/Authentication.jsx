import LoginForm from '../../components/Forms/LoginForm';
import SignupForm from '../../components/Forms/SignupForm';
import { AiOutlineGoogle } from 'react-icons/ai';
import styles from './Login.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

const Authentication = () => {
  const [authPage, setAuthPage] = useState('login');
  const { googleSignIn } = useAuth();

  const handleAuthPageToggle = () => {
    setAuthPage((prevAuthPage) =>
      prevAuthPage === 'login' ? 'signup' : 'login'
    );
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
    <section className={styles.loginContainer}>
      <div className={styles.login}>
        <h2 className={styles.title}>
          User {authPage === 'signup' ? 'Sign Up' : 'Login'}
        </h2>
        <p className={styles.text}>
          Hey, Enter your details to{' '}
          {authPage === 'signup'
            ? 'create a new account.'
            : 'login to your account.'}
        </p>
        {authPage === 'signup' ? <SignupForm /> : <LoginForm />}
        <p className={styles.altLoginText}>Or Sign in with</p>
        <div className={styles.buttonGroup}>
          <button
            className={styles.altLoginButton}
            onClick={handleGoogleSignIn}>
            <AiOutlineGoogle />
            <span>Google</span>
          </button>
          <button className={styles.altLoginButton}>
            <AiOutlineGoogle />
            <span>Google</span>
          </button>
        </div>
        <p className={styles.registerText}>
          Don't have an account?{' '}
          <button onClick={handleAuthPageToggle}>
            {authPage === 'signup' ? 'Login' : 'Signup'}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Authentication;
