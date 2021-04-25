import React from 'react';
import loadingIcon from '../../media/icons/loading.svg';

import { StyledLoadingContainer, LoadingIcon, LoadingText } from './Loading,style';

interface LoadingProps {
  className?: string;
  showText?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ className = '', showText = false }) => {
  return (
    <StyledLoadingContainer className={className}>
      <LoadingIcon src={String(loadingIcon)} alt="loading" />
      {showText ? <LoadingText>Loading...</LoadingText> : null}
    </StyledLoadingContainer>
  );
};
