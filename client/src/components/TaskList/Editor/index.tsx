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
import Card from '@material-ui/core/Card';
import NativeSelect from '@material-ui/core/NativeSelect';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import styles from './index.scss';

const CustomizedDialog: React.FC = (props) => {
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
  ];

  const isSendingData = false;

  const onClose = () => {};

  return (
    <>
      <Dialog maxWidth="md" onClose={onClose} aria-labelledby="customized-dialog-title" open={true}>
        <form noValidate>
          <header className={styles.formHeader}>
            <div>
              <h4>Edit activity</h4>
            </div>
            <IconButton aria-label="close" className={styles.closeButton} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </header>
          <MuiDialogContent dividers className={styles.contentContainer}>
            <div className={styles.formActivityInfo}>
              <div className={styles.activityStatus}>
                <label htmlFor="activityType">Type</label>
                <NativeSelect id="activityType" value={10} input={<select />}>
                  <option aria-label="None" value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </NativeSelect>
              </div>
              <div className={styles.activityAddress}>
                <label htmlFor="activityAddress">Address</label>
                <input id="activityAddress" type="text" value="" />
              </div>
              <div>
                <h5>Description</h5>
                <TextareaAutosize
                  className={styles.textArea}
                  placeholder="Enter title for this card"
                  onBlur={onClose}
                  // onChange={onChangeInputVal}
                  // value={textInputValue}
                />
              </div>
            </div>
            <div className={styles.formUserInfo}>
              <div className={styles.activityStatus}>
                <label htmlFor="activityStatus">Status</label>
                <NativeSelect id="activityStatus" value={10} input={<select />}>
                  <option aria-label="None" value="" />
                  <option value={10}>inProgress</option>
                  <option value={20}>Done</option>
                  <option value={30}>Ready for assign</option>
                </NativeSelect>
              </div>
            </div>
            <div>
              <label htmlFor="activityEstimation">Estimation in hours</label>
              <input id="activityEstimation" type="number" />
            </div>
            <div>
              <h5>Assigned</h5>
              <Autocomplete
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Combo box" variant="outlined" />
                )}
              />
            </div>
            <div>
              <h5>Operator</h5>
              <Autocomplete
                id="combo-box-demo"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Combo box" variant="outlined" />
                )}
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
            <button disabled={isSendingData}>cancel</button>
          </MuiDialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CustomizedDialog;
