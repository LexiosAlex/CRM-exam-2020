import { firebaseReducer, FirebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import activitiesReducer from './activitiesReducer';
import { IActivity } from 'common/index';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  activities: activitiesReducer,
  formReducer,
});

export interface IActivitiesState {
  heap: { [key: string]: IActivity };
  fetchAsync: Object;
}

export interface IAppState {
  firebase: FirebaseReducer.Reducer;
  activities: IActivitiesState;
  formReducer: any;
}

export type AppState = ReturnType<typeof Object>;

export default rootReducer;
