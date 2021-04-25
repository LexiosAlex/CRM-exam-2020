import styled from 'styled-components';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Card from '@material-ui/core/Card';
import { ButtonBase } from '@material-ui/core';

export const StyledTextArea = styled(TextareaAutosize)`
  resize: none;
  width: 100%;
  outline: none;
  border: none;
`;

export const StyledTextAreaContainer = styled(Card)`
  padding: 1rem 2rem;
  overflow: auto;
  min-height: 80px;
  max-width: 236px;
`;

export const StyledAddButton = styled(ButtonBase)`
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
`;
