import React from 'react';

import { ErrorContainer, ErrorMsg } from './Error.style';

interface ErrorProps {
  className?: string;
  errorCode?: string;
  errorMessage: string;
}

export const Error: React.FC<ErrorProps> = ({ className = '', errorCode = '', errorMessage }) => {
  return (
    <ErrorContainer className={className}>
      <ErrorMsg>{errorMessage}</ErrorMsg>
      {errorCode && <p>{`Error code: ${errorCode}`}</p>}
    </ErrorContainer>
  );
};
