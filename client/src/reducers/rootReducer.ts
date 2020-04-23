import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import taskListsReducer from './taskListsReduces';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  taskLists: taskListsReducer,
});

export type AppState = ReturnType<typeof Object>;

export default rootReducer;
