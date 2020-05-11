import { FirebaseReducer } from 'react-redux-firebase';

import { IActivity } from 'common/index';
import { INotification } from './common';

export interface IActivitiesHeapState {
  [key: string]: IActivity;
}

export interface IActivitiesStatusState {
  dragging: boolean;
  allowed: IActivity[];
}

export interface IActivitiesState {
  heap: IActivitiesHeapState;
  status: IActivitiesStatusState;
  fetchAsync: Object;
}

export interface INotificationsState {
  list: INotification[];
}

export interface IAppState {
  firebase: FirebaseReducer.Reducer;
  activities: IActivitiesState;
  notifications: INotificationsState;
  formReducer: any;
}
