import { switchMap, map, mergeMap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { isOfType } from 'typesafe-actions';
import { filter } from 'rxjs/operators';
import { ActionsObservable } from 'redux-observable';

import {
  DRAG_ACTIVITY_DONE,
  DRAG_REQUEST_PENDING,
  DRAG_REQUEST_FAIL,
  DRAG_REQUEST_DONE,
  dragActivitiesActions,
  dragRequestActions,
  DRAG_ACTIVITY_CANCEL,
} from '../interfaces/actions/activities';
import { showNotification } from '../actions/notifier';
import { REFS } from '../utils/refs';
import { INotification } from '../interfaces/common';
import { of } from 'rxjs';

const updateActivityStatus = (payload): Promise<firebase.database.DataSnapshot> => {
  const { id, status } = payload;
  const activityRef = firebase.database().ref(REFS.ACTIVITIES).child(id);
  return activityRef.update({ status });
};

const dragRequested = (payload): dragRequestActions => ({ type: DRAG_REQUEST_PENDING, payload });
const dragDone = (id): dragRequestActions => ({ type: DRAG_REQUEST_DONE, payload: id });
const dragFailed = (error): dragRequestActions => ({ type: DRAG_REQUEST_FAIL, payload: error });
const dragCancel = (): dragActivitiesActions => ({ type: DRAG_ACTIVITY_CANCEL });
const enqueueNotification = (notification: INotification) => showNotification(notification);

const localActivityDragDone = (action$: ActionsObservable<dragActivitiesActions>) =>
  action$.pipe(
    filter(isOfType(DRAG_ACTIVITY_DONE)),
    map((action) => dragRequested(action.payload))
  );

const requestActivitiesDrag = (action$: ActionsObservable<dragRequestActions>) =>
  action$.pipe(
    filter(isOfType(DRAG_REQUEST_PENDING)),
    switchMap((action) =>
      updateActivityStatus(action.payload)
        .then((data) => dragDone(data))
        .catch((error) => dragFailed(error.code))
    )
  );

const setNotification = (action$: ActionsObservable<dragRequestActions>) =>
  action$.pipe(
    filter(isOfType(DRAG_REQUEST_FAIL)),
    mergeMap((action) =>
      of(
        enqueueNotification({
          message: `Failed while dragging. Code: ${action.payload}`,
          options: {
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            key: new Date().getTime() + Math.random(),
            variant: 'error',
          },
        }),
        dragCancel()
      )
    )
  );

export default [localActivityDragDone, requestActivitiesDrag, setNotification];
