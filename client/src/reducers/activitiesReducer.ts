import { combineReducers } from 'redux';

import {
  GET_ACTIVITIES_DONE,
  GET_ACTIVITIES_FAIL,
  GET_ACTIVITIES_PENDING,
  DRAG_ACTIVITY_START,
  DRAG_ACTIVITY_CANCEL,
  DRAG_ACTIVITY_DONE,
} from '../interfaces/actions/activities';
import { createAsyncStateReducer } from './Helpers/asyncReducer';
import { IActivity } from 'common/index';
import { getAllowedStatuses } from 'common/activityWorkflow';
import { IActivitiesStatusState } from './rootReducer';

const initialHeapState: { [key: string]: IActivity } = {};

const heapReducer = (state = initialHeapState, { type, payload }) => {
  switch (type) {
    case GET_ACTIVITIES_DONE:
      return payload;
    default:
      return state;
  }
};

const initialStatusState: IActivitiesStatusState = {
  dragging: false,
  allowed: [],
};

const statusReducer = (state = initialStatusState, { type, payload }) => {
  switch (type) {
    case DRAG_ACTIVITY_START:
      return {
        ...state,
        dragging: true,
        allowed: getAllowedStatuses(payload.type, payload.status),
      };
    case DRAG_ACTIVITY_CANCEL:
      return initialStatusState;
    case DRAG_ACTIVITY_DONE:
      console.log(payload.status);
      return initialStatusState;
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
  status: statusReducer,
  fetchAsync: fetchAsyncReducer,
});
