import { DRAG_ACTIVITY_DONE } from '../interfaces/actions/activities';
import { ActivityStatus } from 'common/index';

export const dragStart = () => {};

export const dragFailed = () => {};

export const dragEnd = (id: string, status: ActivityStatus) => ({
  type: DRAG_ACTIVITY_DONE,
  payload: { id, status },
});
