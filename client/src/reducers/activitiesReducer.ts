import { combineReducers } from 'redux';

import {
  GET_ACTIVITIES_DONE,
  GET_ACTIVITIES_FAIL,
  GET_ACTIVITIES_PENDING,
} from '../interfaces/actions/activities';
import { createAsyncStateReducer } from './Helpers/asyncReducer';
import { IActivity } from 'common/index';

const initialListState: { [key: string]: IActivity } = {};

const heapReducer = (state = initialListState, action) => {
  switch (action.type) {
    case GET_ACTIVITIES_DONE:
      return action.payload;
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
