import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import activitiesReducer from './activitiesReducer';
import notificationsReducer from './notifications';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  activities: activitiesReducer,
  notifications: notificationsReducer,
  formReducer,
});

export type AppState = ReturnType<typeof Object>;

export default rootReducer;
