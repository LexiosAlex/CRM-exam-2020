import { FirebaseReducer } from 'react-redux-firebase';

import { IActivity, ActivityStatus, IEmployee } from 'common/index';
import { INotification } from './common';

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
