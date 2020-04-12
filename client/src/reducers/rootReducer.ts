import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
