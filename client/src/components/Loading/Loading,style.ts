import styled from 'styled-components';

export const StyledLoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #323232;
  background: rgba(255, 255, 255, 0.87);
  min-height: 100%;
  width: 100%;
  z-index: 6;
`;

export const LoadingIcon = styled.img`
  width: 60px;
  height: 60px;
`;

export const LoadingText = styled.p`
  text-align: center;
  font-size: 2rem;
  letter-spacing: 3px;
  text-transform: capitalize;
`;
