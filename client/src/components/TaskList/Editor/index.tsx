import React, { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import NativeSelect from '@material-ui/core/NativeSelect';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';

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
      <Dialog maxWidth="lg" onClose={onClose} aria-labelledby="customized-dialog-title" open={true}>
        <form noValidate className={styles.dialogForm}>
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
                <NativeSelect
                  id="activityType"
                  value={10}
                  input={<InputBase className={styles.formSelect} />}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </NativeSelect>
              </div>
              <div className={styles.activityAddress}>
                <label htmlFor="activityAddress">Address</label>
                <input className={styles.formInput} id="activityAddress" type="text" value="" />
              </div>
              <div>
                <h5>Description</h5>
                <TextareaAutosize
                  className={styles.textArea}
                  onBlur={onClose}
                  // onChange={onChangeInputVal}
                  // value={textInputValue}
                />
              </div>
            </div>
            <div className={styles.formUserInfo}>
              <div className={styles.activityStatus}>
                <label htmlFor="activityStatus">Status</label>
                <NativeSelect
                  id="activityStatus"
                  value={10}
                  input={<InputBase className={styles.formSelect} />}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>inProgress</option>
                  <option value={20}>Done</option>
                  <option value={30}>Ready for assign</option>
                </NativeSelect>
              </div>
              <div className={styles.estimation}>
                <label htmlFor="activityEstimation">Estimation in hours</label>
                <input className={styles.formInput} id="activityEstimation" type="number" />
              </div>
              <div>
                <h5>Assigned</h5>
                <Autocomplete
                  id="combo-box-demo"
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" className={styles.formInput} />
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
                    <TextField {...params} variant="outlined" className={styles.formInput} />
                  )}
                />
              </div>
            </div>
          </MuiDialogContent>
          <MuiDialogActions>
            <div className={styles.formActionsContainer}>
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
              <button
                className={`${isSendingData ? styles.btnDisabled : styles.btnActive} ${
                  styles.btnCancel
                }`}
                disabled={isSendingData}
              >
                cancel
              </button>
            </div>
          </MuiDialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CustomizedDialog;
