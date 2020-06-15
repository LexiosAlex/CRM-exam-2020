import { combineReducers } from 'redux';

import {
  GET_USERS_PENDING,
  GET_USERS_DONE,
  GET_USERS_FAIL,
  EDIT_USER_PENDING,
  EDIT_USER_DONE,
  EDIT_USER_FAIL,
  EDIT_USER_STATE_RESET,
} from '../interfaces/actions/users';
import { createAsyncStateReducer } from './Helpers/asyncReducer';
import { IUsersHeapState } from '../interfaces/state';

const initialUsersState: IUsersHeapState = {};

const usersReducer = (state = initialUsersState, { type, payload }) => {
  switch (type) {
    case GET_USERS_DONE:
      return payload;
    default:
      return state;
  }
};

const fetchUsersAsyncReducer = createAsyncStateReducer(
  GET_USERS_PENDING,
  GET_USERS_DONE,
  GET_USERS_FAIL
);

const tableAsyncEditReducer = createAsyncStateReducer(
  EDIT_USER_PENDING,
  EDIT_USER_DONE,
  EDIT_USER_FAIL,
  EDIT_USER_STATE_RESET
);

export default combineReducers({
  heap: usersReducer,
  fetchAsync: fetchUsersAsyncReducer,
  editAsync: tableAsyncEditReducer,
});
