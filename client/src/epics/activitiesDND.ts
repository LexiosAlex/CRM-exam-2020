import { Epic, ofType } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';
import firebase from 'firebase/app';
import { Action, isOfType } from 'typesafe-actions';
import { filter } from 'rxjs/operators';

import { AppState } from '../reducers/rootReducer';
import { ActionsObservable } from 'redux-observable';

import {
  DRAG_ACTIVITY_DONE,
  DRAG_REQUEST_PENDING,
  DRAG_REQUEST_FAIL,
  DRAG_REQUEST_DONE,
  dragActivityDone,
  dragActivitiesActions,
  dragRequestActions,
} from '../interfaces/actions/activities';
import { REFS } from '../utils/refs';

const updateActivityStatus = (payload): Promise<firebase.database.DataSnapshot> => {
  const { id, status } = payload;
  const activityRef = firebase.database().ref(REFS.ACTIVITIES).child(id);
  return activityRef.update({ status });
};

const dragRequested = (payload): dragRequestActions => ({ type: DRAG_REQUEST_PENDING, payload });
const dragDone = (id): dragRequestActions => ({ type: DRAG_REQUEST_DONE, payload: id });
const dragFailed = (error): dragRequestActions => ({ type: DRAG_REQUEST_FAIL, payload: error });

const localActivityDragDone = (action$: ActionsObservable<dragActivitiesActions>) =>
  action$.pipe(
    filter(isOfType(DRAG_ACTIVITY_DONE)),
    map((action) => dragRequested(action.payload))
  );

const requestActivitiesDrag = (action$: ActionsObservable<dragRequestActions>, state$) =>
  action$.pipe(
    filter(isOfType(DRAG_REQUEST_PENDING)),
    switchMap((action) =>
      updateActivityStatus(action.payload)
        .then((data) => dragDone(data))
        .catch((error) => dragFailed(error.code))
    )
  );

export default [localActivityDragDone, requestActivitiesDrag];
