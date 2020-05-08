import { IRawActivity } from 'common/index';
const prefix = 'ACTIVITIES';

export const GET_ACTIVITIES_DONE: string = `${prefix}/GET_ACTIVITIES_DONE`;
export const GET_ACTIVITIES_FAIL: string = `${prefix}/GET_ACTIVITIES_FAIL`;
export const GET_ACTIVITIES_PENDING: string = `${prefix}/GET_ACTIVITIES_PENDING`;
export const DRAG_ACTIVITY_START: string = `${prefix}/DRAG_ACTIVITY_START`;
export const DRAG_ACTIVITY_CANCEL: string = `${prefix}/DRAG_ACTIVITY_CANCEL`;
export const DRAG_ACTIVITY_DONE: string = `${prefix}/DRAG_ACTIVITY_DONE`;

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
}

export interface dragActivityCancel {
  type: typeof DRAG_ACTIVITY_CANCEL;
}

export interface dragActivityDone {
  type: typeof DRAG_ACTIVITY_DONE;
}

export type activitiesActionTypes =
  | getActivitiesDone
  | getActivitiesFail
  | getActivitiesPending
  | dragActivityStart
  | dragActivityCancel
  | dragActivityDone;
