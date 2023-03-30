import LogInForm from '../../components/Forms/LogInForm';
import { AiOutlineGoogle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  return (
    <section className={styles.loginContainer}>
      <div className={styles.login}>
        <h2 className={styles.title}>User Login</h2>
        <p className={styles.text}>
          Hey, Enter your details to login to your account.
        </p>
        <LogInForm />
        <p className={styles.altLoginText}>Or Sign in with</p>
        <div className={styles.buttonGroup}>
          <button className={styles.altLoginButton}>
            <AiOutlineGoogle />
            <span>Google</span>
          </button>
          <button className={styles.altLoginButton}>
            <AiOutlineGoogle />
            <span>Google</span>
          </button>
        </div>
        <p className={styles.registerText}>
          Don't have an account? <Link to="/signup">register now</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
