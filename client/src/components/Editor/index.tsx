import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';

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

import selectors from '../../selectors';

import styles from './index.scss';
import { FormType } from './common';
import { IAppState } from '../../interfaces/state';
import Loading from '../Loading';
import { IActivity, ActivityStatus, ActivityType, IUser } from 'common/index';
import { FirebaseReducer } from 'react-redux-firebase';

const top100Films: IUser[] = [
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
    customValue,
    ...custom
  } = params;

  return (
    <Autocomplete
      options={top100Films}
      getOptionLabel={(option: IUser) => option.name}
      // defaultValue={customValue ? customValue : null}
      value={customValue}
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
    customValue,
    ...custom
  } = params;

  return (
    <NativeSelect
      value={customValue}
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
    customValue,
    ...custom
  } = params;

  return (
    <input
      className={styles.formInput}
      value={customValue}
      defaultValue={null}
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
    customValue,
    ...custom
  } = params;

  return (
    <TextareaAutosize
      className={styles.textArea}
      onChange={(event: React.FormEvent<HTMLTextAreaElement>) =>
        input.onChange(event.currentTarget.value)
      }
      value={customValue}
      {...custom}
    />
  );
};

interface FormValues {
  assigned: IUser;
  operator: IUser;
  activityStatus: ActivityStatus;
  activityType: ActivityType;
  activityAddress: string;
  activityEstimation: number;
}

interface StateProps {
  formState: any;
  authProfile: FirebaseReducer.AuthState;
}

interface ActivityFormProps extends StateProps {
  dialogType: FormType;
  open: boolean;
  onClose: () => void;
  activity?: IActivity;
}

interface EditorProps extends ActivityFormProps, InjectedFormProps<FormValues, any> {}

const Editor: React.FC<EditorProps> = ({
  dialogType,
  onClose,
  open,
  initialize,
  initialValues,
  formState,
  authProfile,
}) => {
  const inNew = dialogType === FormType.newForm;

  const isLoading = true;
  const isLoadingData = isLoading && !formState;
  //TODO: understand the how to mix it with downloadable state;
  const isSendingData = false;
  useEffect(() => {
    const { uid, displayName } = authProfile;
    inNew &&
      initialize({
        ...initialValues,
        operator: { name: displayName as string, id: uid },
        activityStatus: ActivityStatus.New,
      });
  }, []);

  return (
    <>
      <Dialog maxWidth="lg" onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <form noValidate className={styles.dialogForm}>
          <header className={styles.formHeader}>
            <div>
              <h4>{inNew ? 'Add new activity' : 'Edit activity'}</h4>
            </div>
            <IconButton aria-label="close" className={styles.closeButton} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </header>
          <MuiDialogContent dividers className={styles.contentContainer}>
            {isLoadingData ? (
              <Loading />
            ) : (
              <>
                <div className={styles.formActivityInfo}>
                  <div className={styles.activityStatus}>
                    <label htmlFor="activityType">Type</label>
                    <Field
                      customValue={formState.values.activityType}
                      name="activityType"
                      id="activityType"
                      component={renderSelect}
                    >
                      <option aria-label="None" value="" />
                      {Object.keys(ActivityType).map((key) =>
                        isNaN(Number(key)) ? (
                          <option key={key} value={ActivityType[key]}>
                            {key}
                          </option>
                        ) : null
                      )}
                    </Field>
                  </div>
                  <div className={styles.activityAddress}>
                    <label htmlFor="activityAddress">Address</label>
                    <Field
                      customValue={formState.values.activityAddress}
                      name="activityAddress"
                      id="activityAddress"
                      type="text"
                      component={renderDefaultInput}
                    />
                  </div>
                  <div>
                    <h5>Description</h5>
                    <Field
                      customValue={formState.values.activityDescription}
                      id="activityDescription"
                      name="activityDescription"
                      component={renderTextArea}
                    />
                  </div>
                </div>
                <div className={styles.formUserInfo}>
                  <div className={styles.activityStatus}>
                    <label htmlFor="activityStatus">Status</label>
                    <Field
                      customValue={formState.values.activityStatus}
                      name="activityStatus"
                      id="activityStatus"
                      component={renderSelect}
                    >
                      {Object.keys(ActivityStatus).map((key) =>
                        isNaN(Number(key)) ? (
                          <option key={key} value={ActivityStatus[key]}>
                            {key}
                          </option>
                        ) : null
                      )}
                    </Field>
                  </div>
                  <div className={styles.estimation}>
                    <label htmlFor="activityEstimation">Estimation in hours</label>
                    <Field
                      customValue={formState.values.activityEstimation}
                      id="activityEstimation"
                      name="activityEstimation"
                      type="number"
                      component={renderDefaultInput}
                    />
                  </div>
                  <div>
                    <h5>Assignee</h5>
                    <Field
                      customValue={formState.values.assigned}
                      name="assigned"
                      id="assigned"
                      component={renderAutoComplete}
                    />
                  </div>
                  <div>
                    <h5>Operator</h5>
                    <Field
                      customValue={formState.values.operator}
                      name="operator"
                      id="operator"
                      component={renderAutoComplete}
                    />
                  </div>
                </div>
              </>
            )}
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
                onClick={(event) => {
                  event.preventDefault();
                  onClose();
                }}
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

const InitializedFormEditor = reduxForm<FormValues, ActivityFormProps>({
  form: 'activitiesForm',
  initialValues: {
    assigned: void 0,
    operator: void 0,
    activityStatus: void 0,
    activityType: void 0,
    activityAddress: void 0,
    activityEstimation: void 0,
  },
})(Editor);

export default connect((state: IAppState) => ({
  formState: selectors.forms.getActivityForm(state),
  authProfile: selectors.user.getAuth(state),
}))(InitializedFormEditor);
