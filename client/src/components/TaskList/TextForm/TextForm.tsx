import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Box } from '@material-ui/core';
import { StyledTextArea, StyledAddButton, StyledTextAreaContainer } from './TextForm.style';

interface TextFormProps {
  onClose(): void;
}

export const TextForm: React.FC<TextFormProps> = ({ onClose }) => {
  const [textInputValue, setInputValue] = useState<string>('');

  const onChangeInputVal = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setInputValue(event.currentTarget.value);
  };
  return (
    <div>
      <StyledTextAreaContainer>
        <StyledTextArea
          autoFocus
          placeholder="Enter title for this card"
          onBlur={onClose}
          onChange={onChangeInputVal}
          value={textInputValue}
        />
      </StyledTextAreaContainer>
      <Box
        display="flex"
        paddingTop="2rem"
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <StyledAddButton>Add card</StyledAddButton>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    </div>
  );
};
