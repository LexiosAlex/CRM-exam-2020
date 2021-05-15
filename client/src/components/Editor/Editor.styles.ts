import styled, { css } from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import { Form } from 'redux-form';
import { ButtonBase } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { ReactComponent as LoadingSpinnerIcon } from '../../media/icons/BtnSpinner.svg';

interface SubmitButtonProps {
  $isLoading: boolean;
}

interface CancelButtonProps {
  $isSendingData: boolean;
}

export const LoadingSpinner = styled(LoadingSpinnerIcon)`
  display: block;
  width: 20px;
`;

export const StyledCloseButton = styled(IconButton)`
  position: absolute !important;
  right: 1rem;
  top: 1rem;
  color: #323232;
`;

export const StyledDialogForm = styled(Form)`
  min-width: 900px;
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

const btnDisabled = css`
  cursor: not-allowed;
`;

export const StyledSubmitButton = styled(ButtonBase)<SubmitButtonProps>`
  && {
    width: 140px;
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
    ${({ $isLoading }) => ($isLoading ? btnSpinner : btnActive)}
  }
`;

export const StyledContentContainer = styled(MuiDialogContent)`
  padding: 1.25rem 2rem;
  display: grid;
  grid-template-columns: auto 300px;
  grid-column-gap: 3rem;
  label,
  h5 {
    font-weight: 700;
    margin: 0;
    font-size: 1rem;
    padding: 1rem 0;
  }
`;

export const StyledFormHeader = styled.header`
  padding: 0 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  transition: all 0.3s linear;
  h4 {
    margin: 0;
    padding: 2rem 0;
    font-size: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 700;
  }
`;

const defaultInputStyled = css`
  border-radius: 5px;
  color: #323232;
  border: 1px solid rgba(0, 0, 0, 0.5) !important;
  &:hover,
  &:focus {
    border-color: #ffdd2d !important;
  }
  &:active {
    border-color: #ffe55e !important;
  }
  &&:disabled {
    border-color: #555555 !important;
  }
`;

export const StyledTextField = styled(TextField)`
  padding: 10px 10px;
  min-height: 19px;
  ${defaultInputStyled}
`;

export const StyledFormInput = styled(InputBase)`
  padding: 10px 10px;
  min-height: 19px;
  ${defaultInputStyled}
`;

export const StyledFormSelect = styled(InputBase)`
  ${defaultInputStyled}
  & select {
    padding: 10px 24px 10px 10px !important;
    height: 19px;
  }
`;

export const StyledTextareaAutoSize = styled(TextareaAutosize)`
  width: 100%;
  min-height: 300px;
  outline: none;
  resize: none;
`;

export const StyledBtnCancel = styled(ButtonBase)<CancelButtonProps>`
  && {
    display: inline-block;
    text-decoration: none;
    letter-spacing: 3px;
    color: #323232;
    background: #cfcfcf;
    min-height: 15px;
    padding: 0.4rem 0.9rem;
    border: 3px solid #555555;
    text-transform: uppercase;

    ${({ $isSendingData }) => ($isSendingData ? btnDisabled : btnActive)}
  }
`;
