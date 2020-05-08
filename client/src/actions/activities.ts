import { DRAG_ACTIVITY_START, DRAG_ACTIVITY_DONE } from '../interfaces/actions/activities';
import { ActivityStatus, EmployeeType } from 'common/index';

export const dragStart = (type: EmployeeType, status: ActivityStatus) => ({
  type: DRAG_ACTIVITY_START,
  payload: { type, status },
});

export const dragFailed = () => {};

export const dragCancel = (id: string) => ({
  type: DRAG_ACTIVITY_DONE,
  payload: { id },
});

export const dragEnd = (id: string, status: ActivityStatus) => ({
  type: DRAG_ACTIVITY_DONE,
  payload: { id, status },
});
