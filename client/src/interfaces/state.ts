import { FirebaseReducer } from 'react-redux-firebase';

import { IActivity, ActivityStatus, IAppUser } from 'common/index';
import { INotification } from './common';

export interface IAsyncReducer {
  loaded: boolean;
  pending: boolean;
  error: string;
}

export interface IActivitiesHeapState {
  [key: string]: IActivity;
}

export interface IUsersHeapState {
  [key: string]: IAppUser;
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
  statusAsync: IAsyncReducer;
  formAsync: IAsyncReducer;
}

export interface INotificationsState {
  list: INotification[];
}

export interface IUsersState {
  heap: IUsersHeapState;
  fetchAsync: IAsyncReducer;
}

export interface IAppState {
  firebase: FirebaseReducer.Reducer;
  activities: IActivitiesState;
  notifications: INotificationsState;
  users: IUsersState;
  formReducer: any;
}
