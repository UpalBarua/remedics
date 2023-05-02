import { useState } from 'react';
import LoginForm from '../../components/Forms/LoginForm';
import SignupForm from '../../components/Forms/SignupForm';
import Button from '../../components/UI/Button/Button';

import { AiOutlineGoogle } from 'react-icons/ai';
import { useAuth } from '../../contexts/AuthContext';
import createNewUser from '../../utils/createNewUser';
import styles from './Authentication.module.css';
import { useNavigate } from 'react-router-dom';
import { Ring } from '@uiball/loaders';

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
  const { googleSignIn, user } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  if (user?.uid) {
    return navigate('/');
  }

  const handleSignupToggle = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setAuthError('');
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      const { user } = await googleSignIn();

      if (user?.uid) {
        await createNewUser({
          userName: user?.displayName,
          email: user?.email,
          imageUrl: user?.photoURL,
        });
      }

      navigate('/');
    } catch (error) {
      const authErrorCode = error.code;
      console.log(`Login failed with error code: ${authErrorCode}`);

      setAuthError(authErrorCode);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.authentication}>
      <div className={styles.container}>
        <h2 className={styles.title}>{isSignup ? 'Sign Up' : 'Login'}</h2>
        {isSignup ? (
          <SignupForm setAuthError={setAuthError} setIsLoading={setIsLoading} />
        ) : (
          <LoginForm setAuthError={setAuthError} setIsLoading={setIsLoading} />
        )}
        <Button type={'outlined'} onClick={handleGoogleSignIn}>
          <AiOutlineGoogle size={22} />
          <span>Google</span>
        </Button>
        {authError && (
          <p className={styles.errorMessage}>
            {ERROR_MESSAGES[authError] || ERROR_MESSAGES.UNKNOWN}
          </p>
        )}
        <p className={styles.registerText}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={handleSignupToggle}>
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
        {isLoading && (
          <div className={styles.spinnerOverlay}>
            <Ring size={65} color="hsl(260, 69%, 47%)" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Authentication;
