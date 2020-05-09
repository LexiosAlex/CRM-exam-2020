import { ActivityStatus, EmployeeType, IRawActivity } from 'common/index';
const prefix: string = 'ACTIVITIES';

export const GET_ACTIVITIES_PENDING: string = `${prefix}/GET_ACTIVITIES_PENDING`;
export const GET_ACTIVITIES_FAIL: string = `${prefix}/GET_ACTIVITIES_FAIL`;
export const GET_ACTIVITIES_DONE: string = `${prefix}/GET_ACTIVITIES_DONE`;

export const DRAG_ACTIVITY_START: string = `${prefix}/DRAG_ACTIVITY_START`;
export const DRAG_ACTIVITY_CANCEL: string = `${prefix}/DRAG_ACTIVITY_CANCEL`;
export const DRAG_ACTIVITY_DONE: string = `${prefix}/DRAG_ACTIVITY_DONE`;

export const DRAG_REQUEST_PENDING: string = `${prefix}/DRAG_REQUEST_PENDING`;
export const DRAG_REQUEST_FAIL: string = `${prefix}/DRAG_REQUEST_FAIL`;
export const DRAG_REQUEST_DONE: string = `${prefix}/DRAG_REQUEST_DONE`;

export interface getActivitiesDone {
  type: typeof GET_ACTIVITIES_DONE;
  payload: { [key: string]: IRawActivity };
}

export interface getActivitiesFail {
  type: typeof GET_ACTIVITIES_FAIL;
  payload: string;
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
  payload?: { id: string };
}

export interface dragActivityDone {
  type: typeof DRAG_ACTIVITY_DONE;
  payload: { id: string; status: ActivityStatus };
}

export interface dragRequestPending {
  type: typeof DRAG_REQUEST_PENDING;
  payload: { id: string; status: ActivityStatus };
}

export interface dragRequestFail {
  type: typeof DRAG_REQUEST_FAIL;
  payload: string;
}

export interface dragRequestDone {
  type: typeof DRAG_REQUEST_DONE;
  payload: string;
}

export type dragRequestActions = dragRequestPending | dragRequestFail | dragRequestDone;

export type dragActivitiesActions = dragActivityStart | dragActivityCancel | dragActivityDone;

export type getActivitiesActions = getActivitiesPending | getActivitiesFail | getActivitiesDone;
