import { createSelector } from 'reselect';

import { IAppState, IUsersHeapState, IUsersState } from '../interfaces/state';

import { IAppUser, ITableUser, IUser } from 'common/types';
import { EmployeeType } from 'common/constants';

const getUsersForAutoSuggest = (users: IUsersHeapState) => {
  const usersForAutoSuggest: IUser[] = [];
  if (users) {
    for (let [key, user] of Object.entries(users)) {
      usersForAutoSuggest.push({ id: key, name: user.name });
    }
  }
  return usersForAutoSuggest;
};

const getUsers = (state: IAppState): IUsersState => state.users;

const getRaw = createSelector([getUsers], (users) => users.heap);

const isEmpty = createSelector([getUsers], (users) => !Object.keys(users.heap).length);

const getTableLoading = createSelector(
  [getUsers],
  (users) => users.editAsync.pending || users.fetchAsync.pending
);

const getOperators = createSelector([getRaw], (users) =>
  Object.entries(users).reduce(
    (acc: { [key: string]: IAppUser }, [key, employee]) => ({
      ...acc,
      ...(employee.type === EmployeeType.Operator ? { [key]: employee } : {}),
    }),
    {} as any
  )
);

const getVolunteers = createSelector([getRaw], (heap) =>
  Object.entries(heap).reduce(
    (acc: { [key: string]: IAppUser }, [key, employee]) => ({
      ...acc,
      ...(employee.type === EmployeeType.Volunteer ? { [key]: employee } : {}),
    }),
    {} as any
  )
);

const employeesForTable = createSelector([getRaw], (heap) => {
  const users: ITableUser[] = [];
  Object.entries(heap).map(([key, employee]) => {
    if (employee.type !== EmployeeType.Admin) {
      users.push({ id: key, ...employee });
    }
  });
  return users;
});
const getAutoSuggestOperators = createSelector([getOperators], (heap: IUsersHeapState) =>
  getUsersForAutoSuggest(heap)
);

const getAutoSuggestVolunteers = createSelector([getVolunteers], (heap: IUsersHeapState) =>
  getUsersForAutoSuggest(heap)
);

export default {
  getAutoSuggestVolunteers,
  getAutoSuggestOperators,
  getOperators,
  getVolunteers,
  employeesForTable,
  isEmpty,
  getTableLoading,
};
