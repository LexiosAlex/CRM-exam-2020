import { switchMap, filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import firebase from 'firebase/app';
import { isOfType } from 'typesafe-actions';
import { ActionsObservable, StateObservable } from 'redux-observable';

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
import { ActivityStatus } from 'common/index';
import { IAppState } from '../interfaces/state';

const updateActivityStatus = (payload) => {
  const { id, status } = payload;
  return firebase
    .functions()
    .httpsCallable('changeActivityStatus')({ id, status })
    .then(({ data: { error } }) => {
      if (error) {
        throw error;
      }
    });
};

const changeStatusStart = (payload): changeRequestActions => ({
  type: CHANGE_STATUS_REQUEST_PENDING,
  payload,
});

const changeStatusFail = (
  error: string,
  id: string,
  status: ActivityStatus
): changeRequestActions => ({
  type: CHANGE_STATUS_REQUEST_FAIL,
  payload: { error, id, status },
});

const changeStatusDone = (): changeRequestActions => ({
  type: CHANGE_STATUS_REQUEST_DONE,
  payload: null,
});

const onChangeStatusLocalDone = (action$: ActionsObservable<dragActivitiesActions>) =>
  action$.pipe(
    filter(isOfType(DRAG_ACTIVITY_DONE)),
    map((action) => changeStatusStart(action.payload))
  );

const changeStatusAsync = (
  action$: ActionsObservable<changeRequestActions>,
  state$: StateObservable<IAppState>
) =>
  action$.pipe(
    filter(isOfType(CHANGE_STATUS_REQUEST_PENDING)),
    withLatestFrom(state$),
    switchMap(([action, state]) =>
      updateActivityStatus(action.payload)
        .then(() => changeStatusDone())
        .catch((error) =>
          changeStatusFail(error, state.activities.status.id, state.activities.status.from)
        )
    )
  );

const onChangeStatusAsyncError = (action$: ActionsObservable<changeRequestActions>) =>
  action$.pipe(
    filter(isOfType(CHANGE_STATUS_REQUEST_FAIL)),
    map((action) => notify(`Can't change status. Code: ${action.payload.error}`))
  );

export default [onChangeStatusLocalDone, changeStatusAsync, onChangeStatusAsyncError];
