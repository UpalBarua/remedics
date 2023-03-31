import LoginForm from '../../components/Forms/LoginForm';
import SignupForm from '../../components/Forms/SignupForm';
import { AiOutlineGoogle } from 'react-icons/ai';
import styles from './Login.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

const ERROR_MESSAGES = {
  'auth/wrong-password':
    'The password you entered is incorrect. Please try again.',
  'auth/user-not-found':
    'No account found with this email address. Please sign up first.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled':
    'Your account has been disabled. Please contact support for more information.',
  'auth/email-already-in-use':
    'This email address is already in use. Please use a different email address.',
  'auth/weak-password':
    'The password you entered is weak. Please use a stronger password.',
  'auth/operation-not-allowed':
    'This operation is not allowed. Please contact support for assistance.',
  'auth/network-request-failed':
    'There was a problem connecting to the network. Please check your internet connection and try again.',
  'auth/too-many-requests': 'Too many requests. Please try again later.',
  'auth/popup-closed-by-user':
    'Sign-in popup window was closed before completing the sign-in process. Please try again.',
  'auth/popup-blocked':
    'Sign-in popup window was blocked by your browser. Please allow popups for this website and try again.',
  'auth/popup-blocked-by-browser-extension':
    'A browser extension is blocking the sign-in popup window. Please disable the extension and try again.',
};

const Authentication = () => {
  const [authPage, setAuthPage] = useState('login');
  const { googleSignIn } = useAuth();
  const [authError, setAuthError] = useState('');

  const handleAuthPageToggle = () => {
    setAuthPage((prevAuthPage) =>
      prevAuthPage === 'login' ? 'signup' : 'login'
    );
    setAuthError('');
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await googleSignIn();

      console.log(res.user.uid);

      if (res?.user?.uid) {
        navigate('/');
      }
    } catch (error) {
      const errorCode = error.code;
      console.log(`Login failed with error code: ${errorCode}`);

      setAuthError(errorCode);
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
        {authPage === 'signup' ? (
          <SignupForm setAuthError={setAuthError} />
        ) : (
          <LoginForm setAuthError={setAuthError} />
        )}
        {authError && (
          <p className={styles.errorMessage}>
            {ERROR_MESSAGES[authError] || ERROR_MESSAGES.UNKNOWN}
          </p>
        )}
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
