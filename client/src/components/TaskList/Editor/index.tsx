import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import AddIcon from '@material-ui/icons/Add';
import styles from './index.scss';


enum FormInputType {
  title,
  description,
}

const DialogTitle = props => {
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={styles.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const [titleValue, setTitle] = useState<string>('');
  const [descriptionValue, setDescription] = useState<string>('');

  const onChange: { [key in FormInputType]: Function } = {
    [FormInputType.title]: setTitle,
    [FormInputType.description]: setDescription,
  };
  const [isSendingData, setSendingData] = useState<boolean>(false);

  const handleClickOpen = () => {
    console.log('open');
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.addButtonContainer}>
      <button onClick={handleClickOpen}>
        <AddIcon >add</AddIcon>
        <p>create a new task</p>
      </button>
      <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <form>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Add new card
          </DialogTitle>
          <MuiDialogContent dividers>
            <div className={styles.inputWrapper}>
              <label htmlFor="title">Task Title</label>
              <input
                type="text"
                placeholder="Awesome task title"
                name="title"
                formNoValidate
                onChange={event => onChange[FormInputType.title](event.target.value)}
                value={titleValue}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="description">Description</label>
              <TextareaAutosize
                placeholder="description"
                name="description"
                aria-label="minimum height"
                rowsMin={3}
                onChange={event => onChange[FormInputType.description](event.target.value)}
                value={descriptionValue}
              />
            </div>
          </MuiDialogContent>
          <MuiDialogActions>
            <button
              autoFocus
              disabled={isSendingData}
              type="submit"
              className={`${isSendingData ? styles.btnSpinner : styles.btnActive} ${
                styles.btnPrimary
              }`}
            >
              <span>Save changes</span>
            </button>
          </MuiDialogActions>
        </form>
      </Dialog>
    </div>
  );
}
