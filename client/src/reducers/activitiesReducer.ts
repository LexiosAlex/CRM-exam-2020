import { combineReducers } from 'redux';

import {
  GET_ACTIVITIES_PENDING,
  GET_ACTIVITIES_FAIL,
  GET_ACTIVITIES_DONE,
  DRAG_ACTIVITY_START,
  DRAG_ACTIVITY_CANCEL,
  DRAG_ACTIVITY_DONE,
  CHANGE_STATUS_REQUEST_PENDING,
  CHANGE_STATUS_REQUEST_FAIL,
  CHANGE_STATUS_REQUEST_DONE,
} from '../interfaces/actions/activities';
import { createAsyncStateReducer } from './Helpers/asyncReducer';
import { IActivity, getAllowedStatuses, ActivityStatus } from 'common/index';
import { IActivitiesHeapState, IActivitiesStatusState } from '../interfaces/state';

const initialHeapState: IActivitiesHeapState = {};

const heapReducer = (state = initialHeapState, { type, payload }) => {
  switch (type) {
    case GET_ACTIVITIES_DONE:
      return payload;
    case DRAG_ACTIVITY_DONE:
    case CHANGE_STATUS_REQUEST_FAIL:
      const { id, status } = payload;
      return { ...state, [id]: { ...state[id], status } };
    default:
      return state;
  }
};

const initialStatusState = {
  dragging: false,
  allowed: [],
  id: void 0,
  from: void 0,
  to: void 0,
};

const statusReducer = (state = initialStatusState, { type, payload }) => {
  switch (type) {
    case DRAG_ACTIVITY_START:
      return {
        ...state,
        dragging: true,
        from: payload.status,
        allowed: getAllowedStatuses(payload.type, payload.status),
      };
    case DRAG_ACTIVITY_DONE:
      return { ...state, dragging: false, allowed: [], id: payload.id, to: payload.status };
    case DRAG_ACTIVITY_CANCEL:
      return initialStatusState;
    default:
      return state;
  }
};

const changeStatusAsyncReducer = createAsyncStateReducer(
  CHANGE_STATUS_REQUEST_PENDING,
  CHANGE_STATUS_REQUEST_DONE,
  CHANGE_STATUS_REQUEST_FAIL
);

const fetchAsyncReducer = createAsyncStateReducer(
  GET_ACTIVITIES_PENDING,
  GET_ACTIVITIES_DONE,
  GET_ACTIVITIES_FAIL
);

export default combineReducers({
  heap: heapReducer,
  status: statusReducer,
  fetchAsync: fetchAsyncReducer,
  statusAsync: changeStatusAsyncReducer,
});
