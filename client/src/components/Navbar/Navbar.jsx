import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiMenuAlt1 } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const { user, logOut } = useAuth();

  const handleNavToggle = () => {
    setIsNavVisible((prevIsNavVisible) => !prevIsNavVisible);

    document.body.style.overflow === ''
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = '');
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.navbar} container`}>
        <Link className="logo" to="/">
          <img className={styles.logoImg} src={logo} alt="" />
          ReMedics
        </Link>

        <div className={styles.column}>
          <ul className={styles.menu} data-visible={isNavVisible}>
            <li className={styles.menuItem}>
              <NavLink to="/">Home</NavLink>
            </li>
            {/* <li className={styles.menuItem}>
              <NavLink to="/blog">Blog</NavLink>
            </li> */}
            {user ? (
              <>
                <li className={styles.menuItem}>
                  <NavLink to="/reviews">My Reviews</NavLink>
                </li>
                <li className={styles.menuItem}>
                  <NavLink className="btn btn-primary" to="/add">
                    Add Service
                  </NavLink>
                </li>
                <li className={styles.menuItem}>
                  <button className="btn btn-ghost" onClick={logOut}>
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className={styles.menuItem}>
                  <NavLink to="/signup">Sign Up</NavLink>
                </li>
                <li className={styles.menuItem}>
                  <NavLink to="/login" className="btn btn-primary">
                    Log In
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <button className={styles.toggle} onClick={handleNavToggle}>
            {isNavVisible ? <IoMdClose /> : <HiMenuAlt1 />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
