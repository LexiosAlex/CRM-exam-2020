import styled, { css } from 'styled-components';
import { ButtonBase } from '@material-ui/core';

interface StyledContainerProps {
  $isDropEnabled: boolean;
  $isDragging: boolean;
}

const dropEnabled = css`
  background-color: #e6fffc;
  border: 1px solid #555555;
`;

const dropDisabled = css`
  background-color: #ffe6e8;
  border: 1px solid #555555;
`;

export const StyledContainer = styled.div<StyledContainerProps>`
  margin-right: 10px;
  padding: 8px;
  width: 340px;
  background-color: #f5f5f6;
  border-radius: 3px;
  border: 1px solid #f5f5f6;

  ${({ $isDropEnabled, $isDragging }) =>
    $isDragging && $isDropEnabled ? dropEnabled : dropDisabled}
`;

export const StyledAddNewCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledAddButton = styled(ButtonBase)`
  width: 70px;
  cursor: pointer;
  font-size: 0.7rem;
  line-height: 1rem;
  display: block;
  text-decoration: none;
  letter-spacing: 3px;
  color: #323232;
  background: #ffdd2d;
  height: 35px;
  border-radius: 3px;
  border: 3px solid #ffdd2d;
  text-transform: uppercase;
  &:hover,
  &:focus {
    background-color: transparent;
  }
`;
