import { createSelector } from 'reselect';

import { ActivityStatus, EmployeeType, VISIBLE_STATUSES } from 'common/index';
import { IAppState, IActivitiesState } from '../interfaces/state';

const getProfile = (state: IAppState) => state.firebase.profile;

const getAuth = (state: IAppState) => state.firebase.auth;

const getEmployeeType = createSelector(
  [getProfile],
  (profile): EmployeeType => (profile as any).type
);

const getAllowedStatuses = createSelector(
  [getEmployeeType],
  (type: EmployeeType) => VISIBLE_STATUSES[type] || []
);

export default {
  getAuth,
  getEmployeeType,
  getVisibleStatuses: getAllowedStatuses,
};
