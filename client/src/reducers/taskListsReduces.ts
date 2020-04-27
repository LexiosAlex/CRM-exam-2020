import { IList } from '../interfaces/TaskLists';
import {
  GET_ACTIVITIES_DONE,
  GET_ACTIVITIES_FAIL,
  GET_ACTIVITIES_PENDING,
} from '../interfaces/actions/activities';
import mapActivities from './Helpers/mapActivities';
import { combineReducers } from 'redux';
import { createAsyncStateReducer } from './Helpers/asyncReducer';

const initialState: IList[] = [];

const taskListsReducer = (state: IList[] = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVITIES_DONE: {
      const { payload } = action;
      return mapActivities(payload);
    }
    default:
      return state;
  }
};

export default combineReducers({
  taskListsState: taskListsReducer,
  fetchActivitiesAsyncState: createAsyncStateReducer(
    GET_ACTIVITIES_PENDING,
    GET_ACTIVITIES_DONE,
    GET_ACTIVITIES_FAIL
  ),
});
