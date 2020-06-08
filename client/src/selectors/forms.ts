import { createSelector } from 'reselect';
import { IAppState } from '../interfaces/state';

const getForms = (state: IAppState): any => state.formReducer;

const getActivityForm = createSelector([getForms], (formsState) => formsState.activityForm);

export default {
  getActivityForm,
};
