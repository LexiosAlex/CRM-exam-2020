import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import activitiesReducer from './activitiesReducer';
import notificationsReducer from './notifications';
import usersReducer from './users';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  activities: activitiesReducer,
  notifications: notificationsReducer,
  users: usersReducer,
  formReducer,
});

export type AppState = ReturnType<typeof Object>;

export default rootReducer;
