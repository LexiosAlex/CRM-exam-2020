import { Epic, ofType } from 'redux-observable';
import firebase from 'firebase/app';
import { mergeMap, concat, switchMap, map } from 'rxjs/operators';
import { Action } from 'typesafe-actions';
import { Observable, of } from 'rxjs';

import { EmployeeType } from 'common/index';
import { AppState } from '../reducers/rootReducer';
import { REFS } from '../utils/refs';
import {
  GET_ACTIVITIES_DONE,
  GET_ACTIVITIES_FAIL,
  GET_ACTIVITIES_PENDING,
} from '../interfaces/actions/activities';

const firebasePrefix: string = '@@reactReduxFirebase';

const getQuery = ({
  profile: { type },
  auth: { uid },
}): Promise<firebase.database.DataSnapshot> => {
  const ActivitiesRef = firebase.database().ref(REFS.ACTIVITIES);
  switch (type) {
    case EmployeeType.Admin:
      return ActivitiesRef.once('value');
    case EmployeeType.Operator:
      return ActivitiesRef.orderByChild('operator')
        .equalTo(uid)
        .once('value');
    case EmployeeType.Volunteer:
      return ActivitiesRef.orderByChild('assignee')
        .equalTo(uid)
        .once('value');
    default:
      return Promise.reject({ error: { code: 'Bad Employee type' } });
  }
};

const fetchDataRequested = () => ({ type: GET_ACTIVITIES_PENDING });
const fetchDataFulfilled = payload => ({ type: GET_ACTIVITIES_DONE, payload });
const fetchDataFailed = payload => ({ type: GET_ACTIVITIES_FAIL, payload });

const startFetchActivities: Epic<Action<string>, Action<any>, AppState> = (action$, state$) =>
  action$.pipe(
    ofType(`${firebasePrefix}/SET_PROFILE`),
    map(() => fetchDataRequested())
  );

const fetchActivities: Epic<Action<string>, Action<any>, AppState> = (action$, state$) =>
  action$.pipe(
    ofType(`${firebasePrefix}/SET_PROFILE`),
    switchMap(() =>
      getQuery(state$.value.firebase)
        .then((data) => fetchDataFulfilled(data.val() || {}))
        .catch(error => fetchDataFailed({ error: error.code }))
    )
  );

export default [startFetchActivities, fetchActivities];
