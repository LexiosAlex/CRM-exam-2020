import { createSelector } from 'reselect';

import { IAppState, IEmployeesState, IUsersState } from '../interfaces/state';

import { IEmployee, IUser } from 'common/types';
import { EmployeeType } from 'common/constants';

const getUsersForAutoSuggest = (users: IEmployeesState) => {
  const usersForAutoSuggest: IUser[] = [];
  if (users) {
    for (let [key, user] of Object.entries(users)) {
      usersForAutoSuggest.push({ id: key, name: user.name });
    }
  }
  return usersForAutoSuggest;
};

const getUsers = (state: IAppState): IUsersState => state.users;

const getRaw = createSelector([getUsers], (users) => users.users);

const isEmpty = createSelector([getUsers], (users) => !Object.keys(users.users).length);

const getOperators = createSelector([getRaw], (users) =>
  Object.entries(users).reduce(
    (acc: { [key: string]: IEmployee }, [key, employee]) => ({
      ...acc,
      ...(employee.type === EmployeeType.Operator ? { [key]: employee } : {}),
    }),
    {} as any
  )
);

const getVolunteers = createSelector([getRaw], (heap) =>
  Object.entries(heap).reduce(
    (acc: { [key: string]: IEmployee }, [key, employee]) => ({
      ...acc,
      ...(employee.type === EmployeeType.Volunteer ? { [key]: employee } : {}),
    }),
    {} as any
  )
);

const getAutoSuggestOperators = createSelector([getOperators], (users: IEmployeesState) =>
  getUsersForAutoSuggest(users)
);

const getAutoSuggestVolunteers = createSelector([getVolunteers], (users: IEmployeesState) =>
  getUsersForAutoSuggest(users)
);

export default {
  getAutoSuggestVolunteers,
  getAutoSuggestOperators,
  getOperators,
  getVolunteers,
  isEmpty,
};
