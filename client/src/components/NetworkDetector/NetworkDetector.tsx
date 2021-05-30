import React, { useEffect, useState } from 'react';

import { StyledStatusContainer } from './NetworkDetector.style';
import { useTranslation } from 'react-i18next';

export const NetworkDetector: React.FC = () => {
  const [isOnline, setOnlineStatus] = useState<boolean>(true);
  const { t } = useTranslation();

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
      <p>{t('networkDetector')}</p>
    </StyledStatusContainer>
  ) : null;
};
