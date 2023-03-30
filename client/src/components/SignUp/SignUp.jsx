import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SignUpForm from '../Forms/SignUpForm';
import useTitle from '../../hooks/useTitle';
import styles from './SignUp.module.css';
import img from '../../assets/signup.svg';

const SignUp = () => {
  useTitle('TITLE | Sign Up');

  return (
    <section className={`container ${styles.grid}`}>
      <div className={styles.column}>
        <h2 className="secondary-title text-accent-secondary">signup</h2>
        <p className="primary-title">create a free account right now</p>
        <p className={styles.text}>
          already have an account? <Link to="/login">Login</Link>
        </p>
        <img className={styles.img} src={img} alt="" />
      </div>
      <div className={styles.column}>
        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUp;
