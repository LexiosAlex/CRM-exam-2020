import { createSelector } from 'reselect';

import { ActivityStatus, EmployeeType, VISIBLE_STATUSES } from 'common/index';
import { IAppState, IActivitiesState } from 'src/reducers/rootReducer';

const getProfile = (state: IAppState) => state.firebase.profile;

const getEmployeeType = createSelector(
  [getProfile],
  (profile): EmployeeType => (profile as any).type
);

const getAllowedStatuses = createSelector(
  [getEmployeeType],
  (type: EmployeeType) => VISIBLE_STATUSES[type] || []
);

export default {
  getEmployeeType,
  getVisibleStatuses: getAllowedStatuses,
};
