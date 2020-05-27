import {
  DRAG_ACTIVITY_START,
  DRAG_ACTIVITY_DONE,
  DRAG_ACTIVITY_CANCEL,
  dragActivitiesActions,
  CHANGE_ACTIVITY_REQUEST_PENDING,
  ADD_ACTIVITY_REQUEST_PENDING,
  addActivityRequestPending,
  changeActivityRequestPending,
  changeStatusRequestPending,
  ACTIVITY_FORM_RESET,
} from '../interfaces/actions/activities';
import { ActivityStatus, EmployeeType, IRawActivity, IDraftActivity } from 'common/index';

export const dragStart = (type: EmployeeType, status: ActivityStatus): dragActivitiesActions => ({
  type: DRAG_ACTIVITY_START,
  payload: { type, status },
});

export const dragCancel = (id: string): dragActivitiesActions => ({
  type: DRAG_ACTIVITY_CANCEL,
  payload: { id },
});

export const dragEnd = (id: string, status: ActivityStatus): dragActivitiesActions => ({
  type: DRAG_ACTIVITY_DONE,
  payload: { id, status },
});

export const changeActivity = (
  id: string,
  activity: IDraftActivity
): changeActivityRequestPending => ({
  type: CHANGE_ACTIVITY_REQUEST_PENDING,
  payload: { id, activity },
});

export const addActivity = (activity: IRawActivity): addActivityRequestPending => ({
  type: ADD_ACTIVITY_REQUEST_PENDING,
  payload: { activity },
});

export const resetFormState = () => ({
  type: ACTIVITY_FORM_RESET,
});
