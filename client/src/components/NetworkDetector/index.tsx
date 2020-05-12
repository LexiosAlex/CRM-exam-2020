import React, { useEffect, useState } from 'react';

import styles from './index.scss';

const NetworkDetector: React.FC = () => {
  const [isOnline, setOnlineStatus] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener('online', () => {
      setOnlineStatus(true);
    });
    window.addEventListener('offline', () => {
      setOnlineStatus(false);
    });
    return () => {
      window.removeEventListener('online', () => {
        setOnlineStatus(true);
      });
      window.removeEventListener('offline', () => {
        setOnlineStatus(false);
      });
    };
  }, []);

  return !isOnline ? (
    <div className={styles.onlineStatusContainer}>
      <p>Internet connection lost, no changes will be saved, please stand by</p>
    </div>
  ) : null;
};

export default NetworkDetector;
