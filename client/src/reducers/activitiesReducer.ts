import { combineReducers } from 'redux';

import {
  GET_ACTIVITIES_DONE,
  GET_ACTIVITIES_FAIL,
  GET_ACTIVITIES_PENDING,
  DRAG_ACTIVITY_DONE,
} from '../interfaces/actions/activities';
import { createAsyncStateReducer } from './Helpers/asyncReducer';
import { IActivity } from 'common/index';

const initialListState: { [key: string]: IActivity } = {};

const heapReducer = (state = initialListState, action) => {
  switch (action.type) {
    case GET_ACTIVITIES_DONE:
      return action.payload;
    case DRAG_ACTIVITY_DONE:
      const { id, status } = action.payload;
      console.log(id, status);
      console.log(state);
      // console.log({ ...state, state[id].status = status});
      console.log(state[id]);
      const droppedActivity = { ...state[id], status };
      console.log(droppedActivity);
      return { ...state, [id]: { ...droppedActivity } };
    // Object.entries(state).
    default:
      return state;
  }
};

const fetchAsyncReducer = createAsyncStateReducer(
  GET_ACTIVITIES_PENDING,
  GET_ACTIVITIES_DONE,
  GET_ACTIVITIES_FAIL
);

export default combineReducers({
  heap: heapReducer,
  fetchAsync: fetchAsyncReducer,
});
