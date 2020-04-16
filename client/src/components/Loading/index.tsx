import React from 'react';
import styles from './index.scss';
import loadingIcon from '../../media/icons/loading.svg';

interface LoadingProps {
  className?: string;
  showText?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ className = '', showText = false }) => {
  return (
    <div className={`${styles.loadingContainer}${className}`}>
      <img className={`${styles.loadingIcon}`} src={String(loadingIcon)} alt="loading" />
      {showText ? <p className={styles.loadingText}>Loading...</p> : null}
    </div>
  );
};

export default Loading;
