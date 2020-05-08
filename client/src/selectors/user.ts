import { createSelector } from 'reselect';

import { ActivityStatus, EmployeeType } from 'common/index';
import { IAppState, IActivitiesState } from 'src/reducers/rootReducer';
import { VISIBLE_STATUSES } from 'src/utils/activities';

const getProfile = (state: IAppState) => state.firebase.profile;

const getEmployeeType = createSelector(
  [getProfile],
  (profile): EmployeeType => (profile as any).type
);

const getAllowedStatuses = createSelector(
  [getEmployeeType],
  (type: EmployeeType) => VISIBLE_STATUSES[type]
);

export default {
  getEmployeeType,
  getVisibleStatuses: getAllowedStatuses,
};
