import { IUser } from 'common/types';

const prefix: string = 'USERS';

export const GET_USERS_PENDING: string = `${prefix}/GET_USERS_PENDING`;
export const GET_USERS_FAIL: string = `${prefix}/GET_USERS_FAIL`;
export const GET_USERS_DONE: string = `${prefix}/GET_USERS_DONE`;

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
