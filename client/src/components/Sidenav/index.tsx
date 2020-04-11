import React from 'react';
import { Link } from 'react-router-dom';
import * as navPaths from '../../utils/router';
import styles from './index.scss';

const SideNav: React.FC = () => (
  <aside>
    <div className={styles.sidebar}>
      <nav className={styles.sideNav}>
        <ul className={styles.sideNav__List}>
          <li>
            <Link className={styles.sideNav__link} to={navPaths.HOME}>
              <span className={styles.sideNav__linkTitle}>Home</span>
            </Link>
          </li>
          <li>
            <Link className={styles.sideNav__link} to={navPaths.SIGN_UP}>
              <span className={styles.sideNav__linkTitle}>Sign up</span>
            </Link>
          </li>
          <li>
            <Link className={styles.sideNav__link} to={navPaths.SIGN_IN}>
              <span className={styles.sideNav__linkTitle}>Sign in</span>
            </Link>
          </li>
          <li>
            <Link className={styles.sideNav__link} to={navPaths.LANDING}>
              <span className={styles.sideNav__linkTitle}>Landing</span>
            </Link>
          </li>
          <li>
            <Link className={styles.sideNav__link} to={navPaths.HOME}>
              <span className={styles.sideNav__linkTitle}>Home</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
);

export default SideNav;
