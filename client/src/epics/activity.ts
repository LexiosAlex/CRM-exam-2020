import { switchMap, filter, map, withLatestFrom } from 'rxjs/operators';
import firebase from 'firebase/app';
import { isOfType } from 'typesafe-actions';
import { ActionsObservable, StateObservable } from 'redux-observable';

import {
  DRAG_ACTIVITY_DONE,
  CHANGE_STATUS_REQUEST_PENDING,
  CHANGE_STATUS_REQUEST_FAIL,
  CHANGE_STATUS_REQUEST_DONE,
  dragActivityDone,
  changeStatusRequestActions,
  changeStatusRequestFail,
  changeStatusRequestDone,
  changeStatusRequestPending,
} from '../interfaces/actions/activities';
import { REFS } from '../utils/refs';
import { notify } from './notification';
import { ActivityStatus } from 'common/index';
import { IAppState } from '../interfaces/state';
import i18n from '../i18n';

const updateActivityStatus = (payload): Promise<firebase.database.DataSnapshot> => {
  const { id, status } = payload;
  const activityRef = firebase.database().ref(REFS.ACTIVITIES).child(id);
  return activityRef.update({ status });
};

const changeStatusStart = (payload): changeStatusRequestActions => ({
  type: CHANGE_STATUS_REQUEST_PENDING,
  payload,
});

const changeStatusFail = (
  error: string,
  id: string,
  status: ActivityStatus,
): changeStatusRequestActions => ({
  type: CHANGE_STATUS_REQUEST_FAIL,
  payload: { error, id, status },
});

const changeStatusDone = (payload): changeStatusRequestDone => ({
  type: CHANGE_STATUS_REQUEST_DONE,
  payload: { id: payload.id, status: payload.status },
});

const onChangeStatusLocalDone = (action$: ActionsObservable<dragActivityDone>) =>
  action$.pipe(
    filter(isOfType(DRAG_ACTIVITY_DONE)),
    map((action) => changeStatusStart(action.payload)),
  );

const changeStatusAsync = (
  action$: ActionsObservable<changeStatusRequestPending>,
  state$: StateObservable<IAppState>,
) =>
  action$.pipe(
    filter(isOfType(CHANGE_STATUS_REQUEST_PENDING)),
    withLatestFrom(state$),
    switchMap(([action, state]) =>
      updateActivityStatus(action.payload)
        .then((data) => changeStatusDone(action.payload))
        .catch((error) =>
          changeStatusFail(error.code, state.activities.status.id, state.activities.status.from),
        ),
    ),
  );

const onChangeStatusAsyncError = (action$: ActionsObservable<changeStatusRequestFail>) =>
  action$.pipe(
    filter(isOfType(CHANGE_STATUS_REQUEST_FAIL)),
    map((action) =>
      notify(i18n.t('notifications.activitiesError', { code: action.payload.error })),
    ),
  );

export default [onChangeStatusLocalDone, changeStatusAsync, onChangeStatusAsyncError];
