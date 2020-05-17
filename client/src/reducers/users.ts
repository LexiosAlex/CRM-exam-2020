import { combineReducers } from 'redux';

import { GET_USERS_PENDING, GET_USERS_DONE, GET_USERS_FAIL } from '../interfaces/actions/users';
import { createAsyncStateReducer } from './Helpers/asyncReducer';
import { IEmployeesState } from '../interfaces/state';

const initialUsersState: IEmployeesState = {};

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

export default combineReducers({
  users: usersReducer,
  fetchAsync: fetchUsersAsyncReducer,
});
