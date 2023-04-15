import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { HiMenuAlt1 } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { TbStethoscope } from 'react-icons/tb';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logOut } = useAuth();

  const handleNavToggle = () => {
    setIsNavVisible((prevIsNavVisible) => !prevIsNavVisible);
    document.body.style.overflow = isNavVisible ? 'unset' : 'hidden';
  };

  useEffect(() => {
    const toggleNavBg = () => {
      if (window.scrollY > 40) {
        return setIsScrolled(true);
      }

      setIsScrolled(false);
    };

    document.addEventListener('scroll', toggleNavBg);

    return () => document.removeEventListener('scroll', toggleNavBg);
  }, []);

  return (
    <header className={styles.header} data-scrolled={isScrolled}>
      <nav className={`${styles.navbar} container`}>
        <Link className={styles.logo} to="/">
          <TbStethoscope />
          <span>Remedics</span>
        </Link>
        <div className={styles.column}>
          <ul className={styles.menu} data-visible={isNavVisible}>
            <li className={styles.menuItem}>
              <NavLink to="/">Home</NavLink>
            </li>
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
              <li className={styles.menuItem}>
                <NavLink to="/authentication" className="btn btn-primary">
                  Login / Sign Up
                </NavLink>
              </li>
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
