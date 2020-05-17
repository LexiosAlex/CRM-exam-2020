import { ofType, StateObservable, ActionsObservable } from 'redux-observable';
import firebase from 'firebase/app';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Action } from 'typesafe-actions';

import { ActivityStatus, EmployeeType } from 'common/index';
import { REFS } from '../utils/refs';
import {
  GET_ACTIVITIES_DONE,
  GET_ACTIVITIES_FAIL,
  GET_ACTIVITIES_PENDING,
} from '../interfaces/actions/activities';
import { IAppState } from '../interfaces/state';

const firebasePrefix: string = '@@reactReduxFirebase';

type Snapshot = firebase.database.DataSnapshot;

const performAndQuery = (queries: Promise<Snapshot>[]): Promise<Snapshot> =>
  Promise.all(queries).then(
    (results) =>
      ({
        val: () => results.reduce((acc, result) => ({ ...acc, ...result.val() }), {}),
      } as Snapshot)
  );

const getQuery = async (firebaseState): Promise<Snapshot> => {
  const {
    profile: { type },
    auth: { uid },
  } = firebaseState;
  const ActivitiesRef = firebase.database().ref(REFS.ACTIVITIES);

  switch (type) {
    case EmployeeType.Admin:
      return ActivitiesRef.once('value');

    case EmployeeType.Operator:
      return ActivitiesRef.orderByChild('operator/id').equalTo(uid).once('value');

    case EmployeeType.Volunteer:
      return performAndQuery([
        ActivitiesRef.orderByChild('assignee/id').equalTo(uid).once('value'),
        ActivitiesRef.orderByChild('status')
          .equalTo(ActivityStatus.ReadyForAssignment)
          .once('value'),
      ]);
    default:
      return Promise.reject({ code: 'Bad Employee type' });
  }
};

const fetchDataRequested = () => ({ type: GET_ACTIVITIES_PENDING });
const fetchDataFulfilled = (payload) => ({ type: GET_ACTIVITIES_DONE, payload });
const fetchDataFailed = (payload) => ({ type: GET_ACTIVITIES_FAIL, payload });

const startFetchActivities = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(`${firebasePrefix}/SET_PROFILE`),
    map(() => fetchDataRequested())
  );

const fetchActivities = (action$: ActionsObservable<Action>, state$: StateObservable<IAppState>) =>
  action$.pipe(
    ofType(`${firebasePrefix}/SET_PROFILE`),
    withLatestFrom(state$),
    switchMap(([action, state]) =>
      getQuery(state.firebase)
        .then((data) => fetchDataFulfilled(data.val() || {}))
        .catch((error) => fetchDataFailed({ error: error.code }))
    )
  );

export default [startFetchActivities, fetchActivities];
