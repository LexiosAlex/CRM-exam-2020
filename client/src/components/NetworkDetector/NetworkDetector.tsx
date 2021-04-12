import React, { useEffect, useState } from 'react';

import { StyledStatusContainer } from './NetworkDetector.style';

export const NetworkDetector: React.FC = () => {
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
    <StyledStatusContainer>
      <p>Internet connection lost, no changes will be saved, please stand by</p>
    </StyledStatusContainer>
  ) : null;
};
