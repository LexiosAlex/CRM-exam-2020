import { createSelector } from 'reselect';

import { IAppUser, ITypedUser, EmployeeType } from 'common/index';
import { IAppState, IUsersHeapState, IUsersState } from '../interfaces/state';
import userSelectors from './user';

const getUsers = (state: IAppState): IUsersState => state.users;

const getHeap = createSelector([getUsers], (users) => users.heap);

const isEmpty = createSelector([getUsers], (users) => !Object.keys(users.heap).length);

const isLoading = createSelector(
  [getUsers],
  (users) => users.editAsync.pending || users.fetchAsync.pending
);

const getTypedUser = (id: string, user: IAppUser): ITypedUser => ({
  id,
  name: user.name,
  type: user.type,
});

const userList = createSelector([getHeap], (heap) =>
  Object.entries(heap).reduce((acc: ITypedUser[], [key, employee]) => {
    return [...acc, ...(employee.type !== EmployeeType.Admin ? [getTypedUser(key, employee)] : [])];
  }, [])
);

const operators = createSelector([getHeap, userSelectors.getEmployeeType], (heap, employeeType) =>
  employeeType === EmployeeType.Operator || employeeType === EmployeeType.Admin
    ? Object.entries(heap).reduce(
        (acc: ITypedUser[], [key, employee]) => [
          ...acc,
          ...(employee.type === EmployeeType.Operator ? [getTypedUser(key, employee)] : []),
        ],
        []
      )
    : []
);

const volunteers = createSelector(
  [getHeap, userSelectors.getEmployeeType, userSelectors.getAuth],
  (heap, employeeType, authProfile) =>
    employeeType === EmployeeType.Operator || employeeType === EmployeeType.Admin
      ? Object.entries(heap).reduce(
          (acc: ITypedUser[], [key, employee]) => [
            ...acc,
            ...(employee.type === EmployeeType.Volunteer ? [getTypedUser(key, employee)] : []),
          ],
          []
        )
      : [
          {
            id: authProfile.uid,
            name: authProfile.displayName as string,
            type: EmployeeType.Volunteer,
          },
        ]
);

export default {
  isEmpty,
  isLoading,
  userList,
  operators,
  volunteers,
};
