import { firebaseReducer, FirebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import activitiesReducer from './activitiesReducer';
import { IActivity } from 'common/index';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  activities: activitiesReducer,
});

export interface IActivitiesState {
  heap: { [key: string]: IActivity };
  fetchAsync: Object;
}

export interface IAppState {
  firebase: FirebaseReducer.Reducer;
  activities: IActivitiesState;
}

export type AppState = ReturnType<typeof Object>;

export default rootReducer;
