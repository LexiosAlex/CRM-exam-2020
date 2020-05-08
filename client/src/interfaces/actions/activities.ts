import { IRawActivity } from 'common/index';
const prefix = 'ACTIVITIES';

export const GET_ACTIVITIES_DONE: string = `${prefix}/GET_ACTIVITIES_DONE`;
export const GET_ACTIVITIES_FAIL: string = `${prefix}/GET_ACTIVITIES_FAIL`;
export const GET_ACTIVITIES_PENDING: string = `${prefix}/GET_ACTIVITIES_PENDING`;
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

export interface dragActivityDone {
  type: typeof DRAG_ACTIVITY_DONE;
}

export type activitiesActionTypes =
  | getActivitiesDone
  | getActivitiesFail
  | getActivitiesPending
  | dragActivityDone;
