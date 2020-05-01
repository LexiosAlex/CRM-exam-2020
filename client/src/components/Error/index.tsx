import React from 'react';

import styles from './index.scss';

interface ErrorProps {
  className?: string;
  errorCode?: boolean;
  errorMessage: string;
}

const Error: React.FC<ErrorProps> = ({ className = '', errorCode = false, errorMessage }) => {
  return (
    <div className={`${styles.errorContainer} ${className}`}>
      <p className={styles.errorMsg}>{errorMessage}</p>
      {errorCode ? <p>{`Error code: ${errorCode}`}</p> : null}
    </div>
  );
};

export default Error;
