import React from 'react';
import { useSelector } from 'react-redux';

import ActivitiesMap from '../../components/ActivitiesMap';
import selectors from '../../selectors';

import styles from './index.scss';
import { IAppState } from '../../interfaces/state';
import { IStatistics } from 'common/types';

const Stats: React.FC = () => {
  const statistics: IStatistics = useSelector((state: IAppState) =>
    selectors.activities.getActivitiesStats(state)
  );

  console.log(statistics);
  return (
    <div className={styles.container}>
      <h2>Statistics</h2>
      <div className={styles.statsContainer}>
        <div>
          <h3>Activities today</h3>
          <div className={styles.statsInnerContainer}>
            <div className={styles.counter}>
              <span>{statistics.dailyActivitiesStats.done}</span>
              <p>Done</p>
            </div>
            <div className={styles.counter}>
              <span>{statistics.dailyActivitiesStats.canceled}</span>
              <p>Canceled</p>
            </div>
            <div className={styles.counter}>
              <span>{statistics.dailyActivitiesStats.created}</span>
              <p>Created</p>
            </div>
          </div>
        </div>
        <div>
          <h3>Activities this week</h3>
          <div className={styles.statsInnerContainer}>
            <div className={styles.counter}>
              <span>{statistics.weeklyActivitiesStats.done}</span>
              <p>Done</p>
            </div>
            <div className={styles.counter}>
              <span>{statistics.weeklyActivitiesStats.canceled}</span>
              <p>Canceled</p>
            </div>
            <div className={styles.counter}>
              <span>{statistics.weeklyActivitiesStats.created}</span>
              <p>Created</p>
            </div>
          </div>
        </div>
        <div>
          <h3>Activities this month</h3>
          <div className={styles.statsInnerContainer}>
            <div className={styles.counter}>
              <span>{statistics.monthlyActivitiesStats.done}</span>
              <p>Done</p>
            </div>
            <div className={styles.counter}>
              <span>{statistics.monthlyActivitiesStats.canceled}</span>
              <p>Canceled</p>
            </div>
            <div className={styles.counter}>
              <span>{statistics.monthlyActivitiesStats.created}</span>
              <p>Created</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mapsContainer}>
        <ActivitiesMap />
      </div>
    </div>
  );
};

export default Stats;
