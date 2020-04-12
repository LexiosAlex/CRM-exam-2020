import React from 'react';
import { Link } from 'react-router-dom';
import * as navPaths from '../../utils/router';
import styles from './index.scss';
import { useFirebase } from 'react-redux-firebase';

const SideNav: React.FC = () => {
  const firebase = useFirebase();

  const logOutHandler = () => {
    firebase.logout();
  };
  return (
    <aside className={styles.sidebar}>
      <div>
        <nav className={styles.sideNav}>
          <ul className={styles.sideNav__List}>
            <li>
              <Link className={styles.sideNav__link} to={navPaths.HOME}>
                <span className={styles.sideNav__linkTitle}>Home</span>
              </Link>
            </li>
            <li>
              <Link className={styles.sideNav__link} to={navPaths.LANDING}>
                <span className={styles.sideNav__linkTitle}>Landing</span>
              </Link>
            </li>
            <li>
              <Link className={styles.sideNav__link} to={navPaths.HOME}>
                <span className={styles.sideNav__linkTitle}>Tasks</span>
              </Link>
            </li>
            <li>
              <a className={styles.sideNav__link} onClick={logOutHandler}>
                <span className={styles.sideNav__linkTitle}>LogOut</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideNav;
