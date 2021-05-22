import { ofType, StateObservable, ActionsObservable } from 'redux-observable';
import firebase from 'firebase/app';
import { map, withLatestFrom, mergeMap, catchError, filter } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Action } from 'typesafe-actions';

import { ActivityStatus, EmployeeType } from 'common/index';
import { REFS } from '../utils/refs';
import {
  GET_ACTIVITIES_FULFILL,
  GET_ACTIVITIES_DONE,
  GET_ACTIVITIES_FAIL,
  GET_ACTIVITIES_PENDING,
  getActivitiesFail,
  getActivitiesDone,
} from '../interfaces/actions/activities';
import { notify } from './notification';
import { IAppState } from '../interfaces/state';
import selectors from '../selectors';
import i18n from '../i18n';

const firebasePrefix: string = '@@reactReduxFirebase';
type Snapshot = firebase.database.DataSnapshot;

const performAndQuery = (queries: firebase.database.Query[], onDone: Function) => {
  const snapStore = queries.map(() => ({}));
  const done = (index: number, snap: Snapshot) => {
    snapStore[index] = snap.val();
    (snap as any)['val'] = () => snapStore.reduce((acc, v) => ({ ...acc, ...v }), {});
    onDone(snap);
  };
  queries.forEach((query, index) => query.on('value', (snap) => done(index, snap)));
};

const getQuery = (firebaseState) =>
  new Observable((subscriber) => {
    const ActivitiesRef = firebase.database().ref(REFS.ACTIVITIES);
    const done = (snap: Snapshot) => subscriber.next(snap);
    const fail = (err: string) => subscriber.error(err);
    const {
      profile: { type },
      auth: { uid },
    } = firebaseState;

    switch (type) {
      case EmployeeType.Admin:
        return ActivitiesRef.on('value', done);

      case EmployeeType.Operator:
        return ActivitiesRef.orderByChild('operator/id').equalTo(uid).on('value', done);

      case EmployeeType.Volunteer:
        return performAndQuery(
          [
            ActivitiesRef.orderByChild('assignee/id').equalTo(uid),
            ActivitiesRef.orderByChild('status').equalTo(ActivityStatus.ReadyForAssignment),
          ],
          done,
        );

      default:
        return fail(`Bad Employee type (${type})`);
    }
  });

const fetchDataRequested = () => ({ type: GET_ACTIVITIES_PENDING });
const fetchDataFulfilled = (payload) => ({ type: GET_ACTIVITIES_FULFILL, payload });
const fetchDataDone = (payload) => ({ type: GET_ACTIVITIES_DONE, payload });
const fetchDataFailed = (payload) => ({ type: GET_ACTIVITIES_FAIL, payload });

const startFetchActivities = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(`${firebasePrefix}/SET_PROFILE`),
    map(() => fetchDataRequested()),
  );

const fetchActivities = (action$: ActionsObservable<Action>, state$: StateObservable<IAppState>) =>
  action$.pipe(
    ofType(`${firebasePrefix}/SET_PROFILE`),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
      getQuery(state.firebase).pipe(
        map((data: any) => fetchDataFulfilled(data.val() || {})),
        catchError((error) => of(fetchDataFailed({ error }))),
      ),
    ),
  );

// we want to ignore firebase.activities updates during manual changing of Activity status
const onFetchActivitiesAsyncFulfill = (
  action$: ActionsObservable<getActivitiesDone>,
  state$: StateObservable<IAppState>,
) =>
  action$.pipe(
    ofType(GET_ACTIVITIES_FULFILL),
    withLatestFrom(state$),
    filter(([action, state]) => !selectors.activities.isStatusPending(state)),
    map(([action]) => fetchDataDone(action.payload)),
  );

const onFetchActivitiesAsyncError = (action$: ActionsObservable<getActivitiesFail>) =>
  action$.pipe(
    ofType(GET_ACTIVITIES_FAIL),
    map((action) => notify(`${i18n.t('notifications.activitiesError')} ${action.payload.error}`)),
  );

export default [
  startFetchActivities,
  fetchActivities,
  onFetchActivitiesAsyncFulfill,
  onFetchActivitiesAsyncError,
];
