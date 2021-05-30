import React from 'react';

import { ErrorContainer, ErrorMsg } from './Error.style';
import { useTranslation } from 'react-i18next';

interface ErrorProps {
  className?: string;
  errorCode?: string;
  errorMessage: string;
}

export const Error: React.FC<ErrorProps> = ({ className = '', errorCode = '', errorMessage }) => {
  const { t } = useTranslation();

  return (
    <ErrorContainer className={className}>
      <ErrorMsg>{errorMessage}</ErrorMsg>
      {errorCode && <p>{t('error.errorCode', { code: errorCode })}</p>}
    </ErrorContainer>
  );
};
