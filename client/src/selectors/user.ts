import { createSelector } from 'reselect';

import { ActivityStatus, IActivity, EmployeeType } from 'common/index';
import { IAppState, IActivitiesState } from 'src/reducers/rootReducer';

const getProfile = (state: IAppState) => state.firebase.profile;

const getEmployeeType = createSelector(
  [getProfile],
  (profile): EmployeeType => (profile as any).type
);

export default {
  getEmployeeType,
};
