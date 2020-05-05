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
import { Field, reduxForm } from 'redux-form';

import styles from './index.scss';

interface IUserOption {
  name: string;
  id: string;
}

const top100Films: IUserOption[] = [
  { name: 'The Shawshank Redemption', id: '1994' },
  { name: 'The Godfather', id: '1972' },
  { name: 'The Godfather: Part II', id: '1974' },
  { name: 'The Dark Knight', id: '2008' },
  { name: '12 Angry Men', id: '1957' },
  { name: "Schindler's List", id: '1993' },
];

const renderAutoComplete = (params) => {
  const {
    input,
    meta: { touched, error },
    children,
    required,
    ...custom
  } = params;

  return (
    <Autocomplete
      options={top100Films}
      getOptionLabel={(option: IUserOption) => option.name}
      defaultValue={null}
      onChange={(e, value) => input.onChange(value)}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" className={styles.formInput} />
      )}
      {...custom}
    />
  );
};

const renderSelect = (params) => {
  const {
    input,
    meta: { touched, error },
    children,
    required,
    ...custom
  } = params;

  return (
    <NativeSelect
      value={input.value}
      onChange={(event) => input.onChange(event.target.value)}
      input={<InputBase className={styles.formSelect} />}
      {...custom}
    >
      {children}
    </NativeSelect>
  );
};

const renderDefaultInput = (params) => {
  const {
    input,
    meta: { touched, error },
    children,
    required,
    ...custom
  } = params;

  return (
    <input
      className={styles.formInput}
      value={input.value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => input.onChange(event.target.value)}
      {...custom}
    />
  );
};

const renderTextArea = (params) => {
  const {
    input,
    meta: { touched, error },
    children,
    required,
    ...custom
  } = params;

  return (
    <TextareaAutosize
      className={styles.textArea}
      onChange={(event: React.FormEvent<HTMLTextAreaElement>) =>
        input.onChange(event.currentTarget.value)
      }
      value={input.value}
      {...custom}
    />
  );
};

const CustomizedDialog: React.FC = (props: any) => {
  console.log(props);

  const isSendingData = false;

  const onClose = () => {};

  props.initialize(props.initialValues);

  return (
    <>
      <Dialog
        maxWidth="lg"
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
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
                <Field name="activityType" id="activityType" component={renderSelect}>
                  <option aria-label="None" value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Field>
              </div>
              <div className={styles.activityAddress}>
                <label htmlFor="activityAddress">Address</label>
                <Field
                  name="activityAddress"
                  id="activityAddress"
                  type="text"
                  component={renderDefaultInput}
                />
              </div>
              <div>
                <h5>Description</h5>
                <Field
                  id="activityDescription"
                  name="activityDescription"
                  component={renderTextArea}
                />
              </div>
            </div>
            <div className={styles.formUserInfo}>
              <div className={styles.activityStatus}>
                <label htmlFor="activityStatus">Status</label>
                <Field name="activityStatus" id="activityStatus" component={renderSelect}>
                  <option aria-label="None" value="" />
                  <option value={10}>Status1</option>
                  <option value={20}>Status2</option>
                  <option value={30}>Ready for assign</option>
                </Field>
              </div>
              <div className={styles.estimation}>
                <label htmlFor="activityEstimation">Estimation in hours</label>
                <Field
                  id="activityEstimation"
                  name="activityEstimation"
                  type="number"
                  component={renderDefaultInput}
                />
              </div>
              <div>
                <h5>Assigned</h5>
                <Field name="assigned" id="assigned" component={renderAutoComplete} />
              </div>
              <div>
                <h5>Operator</h5>
                <Field name="operator" id="operator" component={renderAutoComplete} />
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

export default reduxForm({
  form: 'activitiesForm',
  initialValues: {
    assigned: null,
    operator: null,
    activityStatus: '',
    activityType: '',
    activityAddress: '',
    activityEstimation: 0,
  },
})(CustomizedDialog);
