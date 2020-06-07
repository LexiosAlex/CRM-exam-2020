import { createSelector } from 'reselect';

import { IAppState, IUsersHeapState, IUsersState } from '../interfaces/state';

import { IAppUser, ITypedUser, IUser } from 'common/types';
import { EmployeeType } from 'common/constants';
import userSelectors from './user';

const getUsersForAutoSuggest = (users: IUsersHeapState) => {
  const usersForAutoSuggest: IUser[] = [];
  Object.entries(users).map(([key, user]) =>
    usersForAutoSuggest.push({ id: key, name: user.name })
  );

  return usersForAutoSuggest;
};

const getUsers = (state: IAppState): IUsersState => state.users;

const getRaw = createSelector([getUsers], (users) => users.heap);

const isEmpty = createSelector([getUsers], (users) => !Object.keys(users.heap).length);

const getTableLoading = createSelector(
  [getUsers],
  (users) => users.editAsync.pending || users.fetchAsync.pending
);

const getOperators = createSelector(
  [getRaw, userSelectors.getEmployeeType],
  (users, employeeType) =>
    employeeType === EmployeeType.Operator || employeeType === EmployeeType.Admin
      ? getUsersForAutoSuggest(
          Object.entries(users).reduce(
            (acc: { [key: string]: IAppUser }, [key, employee]) => ({
              ...acc,
              ...(employee.type === EmployeeType.Operator ? { [key]: employee } : {}),
            }),
            {} as any
          )
        )
      : []
);

const getVolunteers = createSelector(
  [getRaw, userSelectors.getEmployeeType, userSelectors.getAuth],
  (heap, employeeType, authProfile) =>
    employeeType === EmployeeType.Operator || employeeType === EmployeeType.Admin
      ? getUsersForAutoSuggest(
          Object.entries(heap).reduce(
            (acc: { [key: string]: IAppUser }, [key, employee]) => ({
              ...acc,
              ...(employee.type === EmployeeType.Volunteer ? { [key]: employee } : {}),
            }),
            {} as any
          )
        )
      : [{ name: authProfile.displayName as string, id: authProfile.uid }]
);

const userList = createSelector([getRaw], (heap) =>
  Object.entries(heap).reduce((acc, [key, employee]) => {
    return [...acc, ...(employee.type !== EmployeeType.Admin ? [{ id: [key], ...employee }] : [])];
  }, [] as any)
);

export default {
  getOperators,
  getVolunteers,
  userList,
  isEmpty,
  getTableLoading,
};
