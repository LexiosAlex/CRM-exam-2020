import styled, { css } from 'styled-components';
import { Box, ButtonBase } from '@material-ui/core';
import { ReactComponent as LoadingSpinnerIcon } from '../../media/icons/BtnSpinner.svg';

interface ButtonProps {
  $isLoading: boolean;
}

export const LoadingSpinner = styled(LoadingSpinnerIcon)`
  display: block;
  width: 20px;
`;

export const StyledWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  border-radius: 10px;
  box-shadow: 0 10px 50px #555;
  background-color: #ffffff;

  form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
  }
`;

export const StyledHead = styled.h2`
  text-align: left;
  font-size: 2rem;
  letter-spacing: 3px;
  text-transform: capitalize;
`;

export const StyledInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;

  label {
    letter-spacing: 3px;
    margin-bottom: 0.5rem;
  }

  input {
    padding: 10px 10px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #cfcfcf;
  }
`;

export const StyledErrorMsg = styled.p`
  margin: 0 0 0.5rem;
  padding: 2px 1px 1px 2px;
  color: #323232;
  font-size: 1em;
  border: 1px solid #7c0a02;
  background-color: rgba(255, 0, 0, 0.4);
`;

export const StyledActionsContainer = styled(Box)`
  a {
    padding-top: 0.6rem;
    display: block;
    text-decoration: none;
    color: #323232;
    transition: all 0.3s linear;
    text-align: center;
    font-size: 0.7em;
    font-weight: 600;
    &:hover {
      color: #ffdd2d;
    }
  }
`;

const btnActive = css`
  cursor: pointer;
  transition: all 0.3s linear;
  &:hover {
    background: transparent;
  }
`;

const btnSpinner = css`
  && {
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 25px 25px;
    height: 33px;
    background-color: #ffe55e;
    border-color: #ffe55e;
    cursor: not-allowed;

    span {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      border: 0;
      clip: rect(0 0 0 0);
    }
  }
`;

export const StyledButtonPrimary = styled(ButtonBase)<ButtonProps>`
  && {
    width: 100%;
    display: inline-block;
    text-decoration: none;
    letter-spacing: 3px;
    color: #323232;
    background: #ffdd2d;
    min-height: 15px;
    padding: 0.4rem 0.9rem;
    border: 3px solid #ffdd2d;
    text-transform: uppercase;

    ${({ $isLoading }) => ($isLoading ? btnSpinner : btnActive)}
  }
`;
