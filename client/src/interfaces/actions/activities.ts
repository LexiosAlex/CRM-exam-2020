import { IActivity} from 'common/index'
const prefix = 'ACTIVITIES';

export const GET_ACTIVITIES_DONE: string = `${prefix}/GET_ACTIVITIES_DONE`;
export const GET_ACTIVITIES_FAIL: string = `${prefix}/GET_ACTIVITIES_FAIL`;
export const GET_ACTIVITIES_PENDING: string = `${prefix}/GET_ACTIVITIES_PENDING`;

export interface getActivitiesDone {
  type: typeof  GET_ACTIVITIES_DONE;
  payload: IActivity[]
}

export interface getActivitiesFail {
  type: typeof GET_ACTIVITIES_FAIL;
}

export interface getActivitiesPending {
  type: typeof GET_ACTIVITIES_PENDING;
}

export type activitiesActionTypes = getActivitiesDone | getActivitiesFail | getActivitiesPending;
