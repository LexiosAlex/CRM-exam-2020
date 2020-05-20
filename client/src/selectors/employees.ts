import { createSelector } from 'reselect';

import { IAppState, IUsersState } from '../interfaces/state';

import { IEmployee } from 'common/types';
import { EmployeeType } from 'common/constants';

const getUsers = (state: IAppState): IUsersState => state.users;

const geRaw = createSelector([getUsers], (users) => users.users);

const isEmpty = createSelector([getUsers], (users) => !Object.keys(users.users).length);

const getOperators = createSelector([geRaw], (users) =>
  Object.entries(users).reduce(
    (acc: { [key: string]: IEmployee }, [key, employee]) => ({
      ...acc,
      ...(employee.type === EmployeeType.Operator ? { [key]: employee } : {}),
    }),
    {} as any
  )
);

const getVolunteers = createSelector([geRaw], (heap) =>
  Object.entries(heap).reduce(
    (acc: { [key: string]: IEmployee }, [key, employee]) => ({
      ...acc,
      ...(employee.type === EmployeeType.Volunteer ? { [key]: employee } : {}),
    }),
    {} as any
  )
);

export default {
  getOperators,
  getVolunteers,
  isEmpty,
};
