import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { FirebaseReducer } from 'react-redux-firebase';

import { Box } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import NativeSelect from '@material-ui/core/NativeSelect';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { FormType } from './common';
import { IAppState } from '../../interfaces/state';
import Loading from '../Loading';
import {
  ACTIVITY_TYPES,
  ActivityStatus,
  EmployeeType,
  getAllowedStatuses,
  IActivity,
  IRawActivity,
  ITypedUser,
} from 'common/index';
import selectors from '../../selectors';
import { TITLE_STATUS_MAP, TITLE_TYPE_MAP } from '../../utils/activities';
import { changeActivity, addActivity, resetFormState } from '../../actions/activity';

import {
  StyledCloseButton,
  StyledDialogForm,
  StyledSubmitButton,
  StyledContentContainer,
  StyledFormHeader,
  StyledTextField,
  StyledFormInput,
  StyledFormSelect,
  StyledTextareaAutoSize,
  StyledBtnCancel,
  LoadingSpinner,
} from './Editor.styles';
import PlacesAutoSuggest from './PlacesAutoSuggest';
import { useTranslation } from 'react-i18next';

const renderAutoComplete = (params) => {
  const { input, children, required, customValue, options, ...custom } = params;

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option: ITypedUser) => option.name}
      value={customValue}
      onChange={(e, value) => input.onChange(value)}
      style={{ width: 300 }}
      renderInput={(params) => <StyledTextField {...params} variant="outlined" />}
      {...custom}
    />
  );
};

const renderSelect = (params) => {
  const { input, children, required, customValue, disabled, ...custom } = params;

  return (
    <NativeSelect
      value={customValue}
      onChange={(event) => input.onChange(event.target.value)}
      input={<StyledFormSelect />}
      disabled={disabled}
      {...custom}
    >
      {children}
    </NativeSelect>
  );
};

const renderDefaultInput = (params) => {
  const { input, children, required, customValue, ...custom } = params;

  return (
    <StyledFormInput
      value={customValue}
      defaultValue={null}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => input.onChange(event.target.value)}
      {...custom}
    />
  );
};

const renderTextArea = (params) => {
  const { input, children, required, customValue, ...custom } = params;

  return (
    <StyledTextareaAutoSize
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
  operators: ITypedUser[];
  volunteers: ITypedUser[];
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
  isSent,
  initialize,
  initialValues,
  formState,
  authProfile,
  employeeType,
  volunteers,
  operators,
}) => {
  const dispatch = useDispatch();
  const isNew = formType === FormType.create;
  const { uid, displayName } = authProfile;
  const isLoadingData: boolean = !formState;
  const { t } = useTranslation();

  useEffect(() => {
    const data =
      !isNew && activity
        ? {
            ...activity,
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
    [isSent],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const _activity: IRawActivity = Object.entries(formState.values).reduce(
      (acc, [k, v]) => ({ ...acc, ...(v !== void 0 ? { [k]: v } : {}) }),
      {} as IRawActivity,
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
        <StyledDialogForm onSubmit={handleSubmit} noValidate>
          <StyledFormHeader>
            <div>
              <h4>{isNew ? t('editor.addNewActivity') : t('editor.EditActivity')}</h4>
            </div>
            <StyledCloseButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </StyledCloseButton>
          </StyledFormHeader>
          <StyledContentContainer dividers>
            {isLoadingData ? (
              <Loading />
            ) : (
              <>
                <Box flexDirection="column" display="flex">
                  <Box flexDirection="column" display="flex">
                    <label htmlFor="type">{t('inputs.type')}</label>
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
                  </Box>
                  <Box flexDirection="column" display="flex">
                    <label htmlFor="address">{t('inputs.address')}</label>
                    <Field
                      customValue={formState.values.address}
                      name="address"
                      id="address"
                      type="text"
                      component={PlacesAutoSuggest}
                      disabled={formType === FormType.statusOnly}
                    />
                  </Box>
                  <Box>
                    <h5>{t('inputs.description')}</h5>
                    <Field
                      customValue={formState.values.description}
                      id="description"
                      name="description"
                      component={renderTextArea}
                      disabled={formType === FormType.statusOnly}
                    />
                  </Box>
                </Box>
                <Box flexDirection="column" display="flex">
                  <Box flexDirection="column" display="flex">
                    <label htmlFor="status">{t('inputs.status')}</label>
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
                        <option value={ActivityStatus.New}>{t('inputs.new')}</option>
                      ) : (
                        getAllowedStatuses(
                          employeeType,
                          activity ? activity.status : formState.values.status,
                        ).map((key) => (
                          <option key={key} value={key}>
                            {TITLE_STATUS_MAP[key]}
                          </option>
                        ))
                      )}
                    </Field>
                  </Box>
                  <Box flexDirection="column" display="flex">
                    <label htmlFor="estimation">{t('inputs.estimation')}</label>
                    <Field
                      customValue={formState.values.estimation}
                      id="estimation"
                      name="estimation"
                      type="number"
                      component={renderDefaultInput}
                      disabled={formType === FormType.statusOnly}
                    />
                  </Box>
                  <Box flexDirection="column" display="flex">
                    <label htmlFor="bounty">{t('inputs.bounty')}</label>
                    <Field
                      customValue={formState.values.bounty}
                      id="bounty"
                      name="bounty"
                      type="number"
                      component={renderDefaultInput}
                      disabled={formType === FormType.statusOnly}
                    />
                  </Box>
                  <Box>
                    <h5>{t('inputs.assignee')}</h5>
                    <Field
                      customValue={formState.values.assignee}
                      name="assignee"
                      id="assignee"
                      component={renderAutoComplete}
                      options={volunteers}
                      disabled={formType === FormType.statusOnly || isNew}
                    />
                  </Box>
                  <Box>
                    <h5>{t('inputs.operator')}</h5>
                    <Field
                      customValue={formState.values.operator}
                      name="operator"
                      id="operator"
                      component={renderAutoComplete}
                      options={operators}
                      disabled={
                        formType === FormType.statusOnly || employeeType === EmployeeType.Operator
                      }
                    />
                  </Box>
                </Box>
              </>
            )}
          </StyledContentContainer>
          <MuiDialogActions>
            <Box
              display="flex"
              width="100%"
              paddingLeft="2rem"
              paddingRight="2rem"
              paddingTop="1rem"
              paddingBottom="1rem"
              justifyContent="space-between"
            >
              <StyledSubmitButton
                autoFocus
                disabled={isSendingData}
                type="submit"
                $isLoading={isSendingData}
              >
                {isSendingData ? (
                  <Box display="flex">
                    <LoadingSpinner />
                  </Box>
                ) : (
                  <span>{`${isNew ? t('editor.addActivity') : t('editor.saveChanges')}`}</span>
                )}
              </StyledSubmitButton>
              <StyledBtnCancel
                onClick={(event) => {
                  event.preventDefault();
                  onClose();
                }}
                $isSendingData={isSendingData}
                disabled={isSendingData}
              >
                {t('editor.cancel')}
              </StyledBtnCancel>
            </Box>
          </MuiDialogActions>
        </StyledDialogForm>
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
    bounty: void 0,
  },
})(Editor);

export default connect((state: IAppState) => ({
  formState: selectors.forms.getActivityForm(state),
  authProfile: selectors.user.getAuth(state),
  employeeType: selectors.user.getEmployeeType(state),
  isSendingData: selectors.activities.getFormAsyncState(state).pending,
  isSent: selectors.activities.getFormAsyncState(state).loaded,
  isError: selectors.activities.getFormAsyncState(state).error,
  operators: selectors.employees.operators(state),
  volunteers: selectors.employees.volunteers(state),
}))(InitializedFormEditor);
