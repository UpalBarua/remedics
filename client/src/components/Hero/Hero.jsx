import styles from './Hero.module.css';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.container}`}>
        <p className={styles.welcomeText}>welcome to remedics</p>
        <h1 className={styles.title}>Find the right doctor, right now</h1>
        <p className={styles.text}>
          Say goodbye to the hassle of finding a doctor. Our platform
          streamlines the process and connects you with the right one in no time
        </p>
        <form className={styles.searchBar}>
          <input type="text" placeholder="Search..." />
          <button>
            <BsSearch />
          </button>
        </form>
        {/* <div className={styles.btnGroup}>
          <Link className="btn btn-primary" to="/reviews">
            Reviews
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
