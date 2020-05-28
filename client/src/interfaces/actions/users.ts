import { IUser } from 'common/types';
import { EmployeeType } from 'common/constants';

const prefix: string = 'USERS';

export const GET_USERS_PENDING: string = `${prefix}/GET_USERS_PENDING`;
export const GET_USERS_FAIL: string = `${prefix}/GET_USERS_FAIL`;
export const GET_USERS_DONE: string = `${prefix}/GET_USERS_DONE`;

export const EDIT_USER_PENDING: string = `${prefix}/EDIT_USER_PENDING`;
export const EDIT_USER_FAIL: string = `${prefix}/EDIT_USER_FAIL`;
export const EDIT_USER_DONE: string = `${prefix}/EDIT_USER_DONE`;
export const EDIT_USER_STATE_RESET: string = `${prefix}/EDIT_USER_STATE_RESET`;

export interface editUserDone {
  type: typeof EDIT_USER_PENDING;
  payload: { id: string; type: EmployeeType };
}

export interface editUserFail {
  type: typeof EDIT_USER_FAIL;
  payload: { error: string };
}

export interface editUserPending {
  type: typeof EDIT_USER_PENDING;
  payload: { id: string; type: EmployeeType };
}

export interface getUsersDone {
  type: typeof GET_USERS_DONE;
  payload: { [key: string]: IUser };
}

export interface getUsersFail {
  type: typeof GET_USERS_FAIL;
  payload: { error: string };
}

export interface getUsersPending {
  type: typeof GET_USERS_PENDING;
}

export type getUsersActions = getUsersDone | getUsersFail | getUsersPending;
