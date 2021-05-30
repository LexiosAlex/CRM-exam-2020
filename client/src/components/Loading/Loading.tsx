import React from 'react';
import { useTranslation } from 'react-i18next';

import loadingIcon from '../../media/icons/loading.svg';
import { StyledLoadingContainer, LoadingIcon, LoadingText } from './Loading,style';

interface LoadingProps {
  className?: string;
  showText?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ className = '', showText = false }) => {
  const { t } = useTranslation();

  return (
    <StyledLoadingContainer className={className}>
      <LoadingIcon src={String(loadingIcon)} alt="loading" />
      {showText ? <LoadingText>{t('loading')}...</LoadingText> : null}
    </StyledLoadingContainer>
  );
};
