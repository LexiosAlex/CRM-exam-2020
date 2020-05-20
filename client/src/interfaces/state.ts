import { FirebaseReducer } from 'react-redux-firebase';

import { IActivity, ActivityStatus, IEmployee, IUser } from 'common/index';
import { INotification } from './common';

export interface IAsyncReducer {
  loaded: boolean;
  pending: boolean;
  error: string;
}

export interface IActivitiesHeapState {
  [key: string]: IActivity;
}

export interface IEmployeesState {
  [key: string]: IEmployee;
}

export interface IActivitiesStatusState {
  dragging: boolean;
  allowed: IActivity[];
  id: string;
  from: ActivityStatus;
  to: ActivityStatus;
}

export interface IActivitiesState {
  heap: IActivitiesHeapState;
  status: IActivitiesStatusState;
  fetchAsync: IAsyncReducer;
}

export interface INotificationsState {
  list: INotification[];
}

export interface IUsersState {
  users: IEmployeesState;
  fetchAsync: IAsyncReducer;
}

export interface IAppState {
  firebase: FirebaseReducer.Reducer;
  activities: IActivitiesState;
  notifications: INotificationsState;
  users: IUsersState;
  formReducer: any;
}
