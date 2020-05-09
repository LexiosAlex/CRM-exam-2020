import { firebaseReducer, FirebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import activitiesReducer from './activitiesReducer';
import { IActivity } from 'common/index';
import { reducer as formReducer } from 'redux-form';
import notificationsReducer from './notifications';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  activities: activitiesReducer,
  notifications: notificationsReducer,
  formReducer,
});

export interface IActivitiesStatusState {
  dragging: boolean;
  allowed: IActivity[];
}

export interface IActivitiesState {
  heap: { [key: string]: IActivity };
  status: IActivitiesStatusState;
  fetchAsync: Object;
}

export interface IAppState {
  firebase: FirebaseReducer.Reducer;
  activities: IActivitiesState;
  notifications: any[];
  formReducer: any;
}

export type AppState = ReturnType<typeof Object>;

export default rootReducer;
