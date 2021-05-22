import { switchMap, filter, map, withLatestFrom } from 'rxjs/operators';
import firebase from 'firebase';
import { isOfType } from 'typesafe-actions';
import { ActionsObservable, StateObservable } from 'redux-observable';

import {
  ADD_ACTIVITY_REQUEST_PENDING,
  ADD_ACTIVITY_REQUEST_FAIL,
  ADD_ACTIVITY_REQUEST_DONE,
  CHANGE_ACTIVITY_REQUEST_PENDING,
  CHANGE_ACTIVITY_REQUEST_FAIL,
  CHANGE_ACTIVITY_REQUEST_DONE,
  changeActivityRequestDone,
  changeActivityRequestFail,
  changeActivityRequestPending,
  addActivityRequestFail,
  addActivityRequestPending,
} from '../interfaces/actions/activities';

import { REFS } from '../utils/refs';
import { notify } from './notification';
import { IAppState } from '../interfaces/state';
import i18n from '../i18n';

const onChangeAsyncError = (action$: ActionsObservable<changeActivityRequestFail>) =>
  action$.pipe(
    filter(isOfType(CHANGE_ACTIVITY_REQUEST_FAIL)),
    map((action) =>
      notify(i18n.t('notifications.activityEditError', { code: action.payload.error })),
    ),
  );

const onChangeError = (error): changeActivityRequestFail => ({
  type: CHANGE_ACTIVITY_REQUEST_DONE,
  payload: { error },
});

const changeActivityDone = ({ id, activity }): changeActivityRequestDone => ({
  type: CHANGE_ACTIVITY_REQUEST_DONE,
  payload: { id, activity },
});

const changeActivity = ({ id, activity }): Promise<firebase.database.DataSnapshot> => {
  const activityRef = firebase.database().ref(REFS.ACTIVITIES).child(id);
  return activityRef.update({ ...activity });
};

const changeActivityAsync = (
  action$: ActionsObservable<changeActivityRequestPending>,
  state$: StateObservable<IAppState>,
) =>
  action$.pipe(
    filter(isOfType(CHANGE_ACTIVITY_REQUEST_PENDING)),
    withLatestFrom(state$),
    switchMap(([action, state]) =>
      changeActivity(action.payload)
        .then((data) => changeActivityDone(action.payload))
        .catch((error) => onChangeError(error.code)),
    ),
  );

const addActivityDone = ({ id, activity }) => ({
  type: ADD_ACTIVITY_REQUEST_DONE,
  payload: { id, activity },
});

const addActivity = async ({ activity }): Promise<any> => {
  const activitiesRef = firebase.database().ref(REFS.ACTIVITIES);
  const pushKey = await activitiesRef.push().key;

  if (pushKey) {
    return activitiesRef
      .child(pushKey)
      .set({ ...activity, assignee: null })
      .then(() => Promise.resolve({ activity: { ...activity, assignee: null }, id: pushKey }));
  }

  return Promise.reject({ code: 'WRONG_DATA_REF' });
};

const onAddActivityDone = (
  action$: ActionsObservable<addActivityRequestPending>,
  state$: StateObservable<IAppState>,
) =>
  action$.pipe(
    filter(isOfType(ADD_ACTIVITY_REQUEST_PENDING)),
    withLatestFrom(state$),
    switchMap(([action, state]) =>
      addActivity(action.payload)
        .then((data) => addActivityDone(data))
        .catch((error) => onAddError(error.code)),
    ),
  );

const onAddError = (error): addActivityRequestFail => ({
  type: ADD_ACTIVITY_REQUEST_FAIL,
  payload: { error },
});

const onAddAsyncError = (action$: ActionsObservable<addActivityRequestFail>) =>
  action$.pipe(
    filter(isOfType(ADD_ACTIVITY_REQUEST_FAIL)),
    map((action) =>
      notify(i18n.t('notifications.activityAddError', { code: action.payload.error })),
    ),
  );

export default [changeActivityAsync, onChangeAsyncError, onAddActivityDone, onAddAsyncError];
