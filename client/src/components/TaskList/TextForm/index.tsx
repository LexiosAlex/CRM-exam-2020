import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import IconButton from "@material-ui/core/IconButton";
import styles from './index.scss';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CloseIcon from "@material-ui/icons/Close";

interface TextFormProps {
  onClose(): void;
}

const TextForm: React.FC<TextFormProps> = ({ onClose }) => {
  const [textInputValue, setInputValue] = useState<string>('');

  const onChangeInputVal = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setInputValue(event.currentTarget.value);
  };
  return (
    <div>
      <Card className={styles.textAreaContainer}>
        <TextareaAutosize
          className={styles.textArea}
          autoFocus
          placeholder="Enter title for this card"
          onBlur={onClose}
          onChange={onChangeInputVal}
          value={textInputValue}
        />
      </Card>
      <div className={styles.buttonsContainer}>
        <button className={styles.addButton}>Add card</button>
        <IconButton onClick={onClose}><CloseIcon/></IconButton>
      </div>
    </div>
  );
};

export default TextForm;
