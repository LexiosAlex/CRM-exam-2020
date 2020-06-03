import React from 'react';
import styles from './index.scss';

const Admin: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>Statistics</h2>
      <div className={styles.statsContainer}>
        <div>
          <h3>Activities today</h3>
          <div className={styles.counter}>
            <span>10</span>
            <p>Done</p>
          </div>
          <div className={styles.counter}>
            <span>3</span>
            <p>Canceled</p>
          </div>
          <div className={styles.counter}>
            <span>10</span>
            <p>Created</p>
          </div>
        </div>
        <div>
          <h3>Activities this week</h3>
          <div className={styles.counter}>
            <span>16</span>
            <p>Done</p>
          </div>
          <div className={styles.counter}>
            <span>5</span>
            <p>Canceled</p>
          </div>
          <div className={styles.counter}>
            <span>15</span>
            <p>Created</p>
          </div>
        </div>
        <div>
          <h3>Activities this month</h3>
          <div className={styles.counter}>
            <span>16</span>
            <p>Done</p>
          </div>
          <div className={styles.counter}>
            <span>5</span>
            <p>Canceled</p>
          </div>
          <div className={styles.counter}>
            <span>15</span>
            <p>Created</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
