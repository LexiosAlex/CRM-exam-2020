import styled from 'styled-components';
import { Box } from '@material-ui/core';

export const ErrorContainer = styled(Box)`
  margin-top: 200px;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem 2.5rem;
  display: flex;
  max-width: 350px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #7c0a02;
  background-color: rgba(255, 0, 0, 0.4);
`;

export const ErrorMsg = styled.p`
  font-weight: 700;
  color: #323232;
`;
