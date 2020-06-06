import { ActivityStatus, EmployeeType, IRawActivity, IDraftActivity } from 'common/index';
const prefix: string = 'ACTIVITIES';

export const GET_ACTIVITIES_PENDING: string = `${prefix}/GET_ACTIVITIES_PENDING`;
export const GET_ACTIVITIES_FAIL: string = `${prefix}/GET_ACTIVITIES_FAIL`;
export const GET_ACTIVITIES_FULFILL: string = `${prefix}/GET_ACTIVITIES_FULFILL`;
export const GET_ACTIVITIES_DONE: string = `${prefix}/GET_ACTIVITIES_DONE`;

export const DRAG_ACTIVITY_START: string = `${prefix}/DRAG_ACTIVITY_START`;
export const DRAG_ACTIVITY_CANCEL: string = `${prefix}/DRAG_ACTIVITY_CANCEL`;
export const DRAG_ACTIVITY_DONE: string = `${prefix}/DRAG_ACTIVITY_DONE`;

export const CHANGE_STATUS_REQUEST_PENDING: string = `${prefix}/CHANGE_STATUS_REQUEST_PENDING`;
export const CHANGE_STATUS_REQUEST_FAIL: string = `${prefix}/CHANGE_STATUS_REQUEST_FAIL`;
export const CHANGE_STATUS_REQUEST_DONE: string = `${prefix}/CHANGE_STATUS_REQUEST_DONE`;

export const CHANGE_ACTIVITY_REQUEST_PENDING: string = `${prefix}/CHANGE_ACTIVITY_REQUEST_PENDING`;
export const CHANGE_ACTIVITY_REQUEST_FAIL: string = `${prefix}/CHANGE_ACTIVITY_REQUEST_FAIL`;
export const CHANGE_ACTIVITY_REQUEST_DONE: string = `${prefix}/CHANGE_ACTIVITY_REQUEST_DONE`;

export const ADD_ACTIVITY_REQUEST_PENDING: string = `${prefix}/ADD_ACTIVITY_REQUEST_PENDING`;
export const ADD_ACTIVITY_REQUEST_FAIL: string = `${prefix}/ADD_ACTIVITY_REQUEST_FAIL`;
export const ADD_ACTIVITY_REQUEST_DONE: string = `${prefix}/ADD_ACTIVITY_REQUEST_DONE`;

export const ACTIVITY_FORM_RESET: string = `${prefix}/ACTIVITY_FORM_RESET`;

export interface getActivitiesDone {
  type: typeof GET_ACTIVITIES_DONE;
  payload: { [key: string]: IRawActivity };
}

export interface getActivitiesFail {
  type: typeof GET_ACTIVITIES_FAIL;
  payload: { error: string };
}

export interface getActivitiesPending {
  type: typeof GET_ACTIVITIES_PENDING;
}

export interface dragActivityStart {
  type: typeof DRAG_ACTIVITY_START;
  payload: { type: EmployeeType; status: ActivityStatus };
}

export interface dragActivityCancel {
  type: typeof DRAG_ACTIVITY_CANCEL;
  payload: { id: string };
}

export interface dragActivityDone {
  type: typeof DRAG_ACTIVITY_DONE;
  payload: { id: string; status: ActivityStatus };
}

export interface changeStatusRequestPending {
  type: typeof CHANGE_STATUS_REQUEST_PENDING;
  payload: { id: string; status: ActivityStatus };
}

export interface changeStatusRequestFail {
  type: typeof CHANGE_STATUS_REQUEST_FAIL;
  payload: { error: string; id: string; status: ActivityStatus };
}

export interface changeStatusRequestDone {
  type: typeof CHANGE_STATUS_REQUEST_DONE;
  payload?: { id: string; status: ActivityStatus };
}

export interface changeActivityRequestPending {
  type: typeof CHANGE_ACTIVITY_REQUEST_PENDING;
  payload: { id: string; activity: IDraftActivity };
}

export interface changeActivityRequestFail {
  type: typeof CHANGE_ACTIVITY_REQUEST_FAIL;
  payload: { error: string };
}

export interface changeActivityRequestDone {
  type: typeof CHANGE_ACTIVITY_REQUEST_DONE;
  payload: { id: string; activity: IDraftActivity };
}

export interface addActivityRequestPending {
  type: typeof ADD_ACTIVITY_REQUEST_PENDING;
  payload: { activity: IRawActivity };
}

export interface addActivityRequestFail {
  type: typeof ADD_ACTIVITY_REQUEST_FAIL;
  payload: { error: string };
}

export interface addActivityRequestDone {
  type: typeof ADD_ACTIVITY_REQUEST_DONE;
  payload: { id: string; activity: IRawActivity };
}

export type changeStatusRequestActions =
  | changeStatusRequestPending
  | changeStatusRequestFail
  | changeStatusRequestDone;

export type dragActivitiesActions = dragActivityStart | dragActivityCancel | dragActivityDone;

export type getActivitiesActions = getActivitiesPending | getActivitiesFail | getActivitiesDone;
