import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { FirebaseReducer } from 'react-redux-firebase';

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

import { FormType } from './common';
import { IAppState } from '../../interfaces/state';
import Loading from '../Loading';
import {
  ActivityStatus,
  EmployeeType,
  getAllowedStatuses,
  IActivity,
  IRawActivity,
  IUser,
} from 'common/index';
import selectors from '../../selectors';
import { ACTIVITY_TYPES } from 'common/constants';
import { TITLE_STATUS_MAP, TITLE_TYPE_MAP } from '../../utils/activities';
import { changeActivity, addActivity, resetFormState } from '../../actions/activity';

import styles from './index.scss';

const renderAutoComplete = (params) => {
  const {
    input,
    meta: { touched, error },
    children,
    required,
    customValue,
    options,
    ...custom
  } = params;

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option: IUser) => option.name}
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
    disabled,
    ...custom
  } = params;

  return (
    <NativeSelect
      value={customValue}
      onChange={(event) => input.onChange(event.target.value)}
      input={<InputBase className={styles.formSelect} />}
      disabled={disabled}
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

interface StateProps {
  formState: any;
  isSendingData: boolean;
  isError: string;
  isSent: boolean;
  authProfile: FirebaseReducer.AuthState;
  employeeType: EmployeeType;
  autoSuggestOperators: IUser[];
  autoSuggestVolunteers: IUser[];
}

interface ActivityFormProps extends StateProps {
  formType: FormType;
  open: boolean;
  onClose: () => void;
  activity: IActivity | null;
}

interface EditorProps extends ActivityFormProps, InjectedFormProps<IActivity, any> {}

const Editor: React.FC<EditorProps> = ({
  formType,
  onClose,
  open,
  activity,
  isSendingData,
  isError,
  isSent,
  initialize,
  initialValues,
  formState,
  authProfile,
  employeeType,
  autoSuggestVolunteers,
  autoSuggestOperators,
}) => {
  const dispatch = useDispatch();
  const isNew = formType === FormType.create;
  const { uid, displayName } = authProfile;
  const isLoadingData: boolean = !formState;
  //sendingForAsyncState

  const operatorAutoSuggestOptions: IUser[] =
    employeeType === EmployeeType.Operator || employeeType === EmployeeType.Admin
      ? autoSuggestOperators
      : [];

  const assigneeAutoSuggestOptions: IUser[] =
    employeeType === EmployeeType.Operator || employeeType === EmployeeType.Admin
      ? autoSuggestVolunteers
      : [{ name: displayName as string, id: uid }];

  useEffect(() => {
    const data =
      !isNew && activity
        ? {
            assignee: activity.assignee,
            operator: activity.operator,
            status: activity.status,
            type: activity.type,
            address: activity.address,
            estimation: activity.estimation,
            description: activity.description,
          }
        : {
            ...initialValues,
            operator: { name: displayName as string, id: uid },
            status: ActivityStatus.New,
          };
    initialize(data);
  }, []);

  React.useEffect(
    () => () => {
      dispatch(resetFormState());
      onClose();
    },
    [isSent]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const _activity: IRawActivity = Object.entries(formState.values).reduce(
      (acc, [k, v]) => ({ ...acc, ...(v !== void 0 ? { [k]: v } : {}) }),
      {} as IRawActivity
    );
    if (formType === FormType.create) {
      dispatch(addActivity(_activity));
    } else if (activity) {
      if (formType === FormType.edit) {
        dispatch(changeActivity(activity.id, _activity));
      } else if (formType === FormType.statusOnly) {
        dispatch(changeActivity(activity.id, { status: _activity.status }));
      }
    }
  };

  return (
    <>
      <Dialog maxWidth="lg" onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <form onSubmit={handleSubmit} noValidate className={styles.dialogForm}>
          <header className={styles.formHeader}>
            <div>
              <h4>{isNew ? 'Add new activity' : 'Edit activity'}</h4>
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
                    <label htmlFor="type">Type</label>
                    <Field
                      customValue={formState.values.type}
                      name="type"
                      id="type"
                      component={renderSelect}
                      disabled={formType === FormType.statusOnly}
                    >
                      <option aria-label="None" value="" />
                      {ACTIVITY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {TITLE_TYPE_MAP[type]}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className={styles.activityAddress}>
                    <label htmlFor="address">Address</label>
                    <Field
                      customValue={formState.values.address}
                      name="address"
                      id="address"
                      type="text"
                      component={renderDefaultInput}
                      disabled={formType === FormType.statusOnly}
                    />
                  </div>
                  <div>
                    <h5>Description</h5>
                    <Field
                      customValue={formState.values.description}
                      id="description"
                      name="description"
                      component={renderTextArea}
                      disabled={formType === FormType.statusOnly}
                    />
                  </div>
                </div>
                <div className={styles.formUserInfo}>
                  <div className={styles.activityStatus}>
                    <label htmlFor="status">Status</label>
                    <Field
                      customValue={formState.values.status}
                      name="status"
                      type="number"
                      id="status"
                      component={renderSelect}
                      disabled={isNew}
                      parse={(value) => Number(value)}
                    >
                      {isNew ? (
                        <option value={ActivityStatus.New}>New</option>
                      ) : (
                        getAllowedStatuses(
                          employeeType,
                          activity ? activity.status : formState.values.status
                        ).map((key) => (
                          <option key={key} value={key}>
                            {TITLE_STATUS_MAP[key]}
                          </option>
                        ))
                      )}
                    </Field>
                  </div>
                  <div className={styles.estimation}>
                    <label htmlFor="estimation">Estimation in hours</label>
                    <Field
                      customValue={formState.values.estimation}
                      id="estimation"
                      name="estimation"
                      type="number"
                      component={renderDefaultInput}
                      disabled={formType === FormType.statusOnly}
                    />
                  </div>
                  <div>
                    <h5>Assignee</h5>
                    <Field
                      customValue={formState.values.assignee}
                      name="assignee"
                      id="assignee"
                      component={renderAutoComplete}
                      options={assigneeAutoSuggestOptions}
                      disabled={formType === FormType.statusOnly || isNew}
                    />
                  </div>
                  <div>
                    <h5>Operator</h5>
                    <Field
                      customValue={formState.values.operator}
                      name="operator"
                      id="operator"
                      component={renderAutoComplete}
                      options={operatorAutoSuggestOptions}
                      disabled={
                        formType === FormType.statusOnly || employeeType === EmployeeType.Operator
                      }
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
                <span>{`${isNew ? 'Add activity' : 'Save changes'}`}</span>
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

const InitializedFormEditor = reduxForm<IActivity, ActivityFormProps>({
  form: 'activityForm',
  initialValues: {
    assignee: void 0,
    operator: void 0,
    status: void 0,
    type: void 0,
    address: void 0,
    estimation: void 0,
    description: void 0,
  },
})(Editor);

export default connect((state: IAppState) => ({
  formState: selectors.forms.getActivityForm(state),
  authProfile: selectors.user.getAuth(state),
  employeeType: selectors.user.getEmployeeType(state),
  isSendingData: selectors.activities.getFormAsyncState(state).pending,
  isSent: selectors.activities.getFormAsyncState(state).loaded,
  isError: selectors.activities.getFormAsyncState(state).error,
  autoSuggestOperators: selectors.employees.getAutoSuggestOperators(state),
  autoSuggestVolunteers: selectors.employees.getAutoSuggestVolunteers(state),
}))(InitializedFormEditor);
