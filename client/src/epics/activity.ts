import { switchMap, filter, map, mergeMap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { isOfType } from 'typesafe-actions';
import { ActionsObservable } from 'redux-observable';

import {
  DRAG_ACTIVITY_DONE,
  CHANGE_STATUS_REQUEST_PENDING,
  CHANGE_STATUS_REQUEST_FAIL,
  CHANGE_STATUS_REQUEST_DONE,
  dragActivitiesActions,
  changeRequestActions,
} from '../interfaces/actions/activities';
import { REFS } from '../utils/refs';
import { notify } from './notification';

const updateActivityStatus = (payload): Promise<firebase.database.DataSnapshot> => {
  const { id, status } = payload;
  const activityRef = firebase.database().ref(REFS.ACTIVITIES).child(id);
  return activityRef.update({ status });
};

const changeStatusStart = (payload): changeRequestActions => ({
  type: CHANGE_STATUS_REQUEST_PENDING,
  payload,
});
const changeStatusFail = (error): changeRequestActions => ({
  type: CHANGE_STATUS_REQUEST_FAIL,
  payload: error,
});
const changeStatusDone = (id): changeRequestActions => ({
  type: CHANGE_STATUS_REQUEST_DONE,
  payload: id,
});

const onChangeStatusLocalDone = (action$: ActionsObservable<dragActivitiesActions>) =>
  action$.pipe(
    filter(isOfType(DRAG_ACTIVITY_DONE)),
    map((action) => changeStatusStart(action.payload))
  );

const changeStatusAsync = (action$: ActionsObservable<changeRequestActions>) =>
  action$.pipe(
    filter(isOfType(CHANGE_STATUS_REQUEST_PENDING)),
    switchMap((action) =>
      updateActivityStatus(action.payload)
        .then((data) => changeStatusDone(data))
        .catch((error) => changeStatusFail(error.code))
    )
  );

const onChangeStatusAsyncError = (action$: ActionsObservable<changeRequestActions>) =>
  action$.pipe(
    filter(isOfType(CHANGE_STATUS_REQUEST_FAIL)),
    map((action) => notify(`Can't change status. Code: ${action.payload}`))
  );

export default [onChangeStatusLocalDone, changeStatusAsync, onChangeStatusAsyncError];
