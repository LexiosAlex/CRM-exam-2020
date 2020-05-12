import { Epic, ofType } from 'redux-observable';
import firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Action } from 'typesafe-actions';

import { ActivityStatus, EmployeeType } from 'common/index';
import { AppState } from '../reducers/rootReducer';
import { REFS } from '../utils/refs';
import {
  GET_ACTIVITIES_DONE,
  GET_ACTIVITIES_FAIL,
  GET_ACTIVITIES_PENDING,
} from '../interfaces/actions/activities';

const firebasePrefix: string = '@@reactReduxFirebase';

const getQuery = async ({
  profile: { type },
  auth: { uid },
}): Promise<firebase.database.DataSnapshot> => {
  const ActivitiesRef = firebase.database().ref(REFS.ACTIVITIES);
  let byAvailabilityValues: any = '';
  let byAssignee: any = '';

  switch (type) {
    case EmployeeType.Admin:
      await ActivitiesRef.once('value')
        .then((data) => {
          byAvailabilityValues = data.val();
        })
        .catch((error) => Promise.reject(error));
      return byAvailabilityValues;

    case EmployeeType.Operator:
      ActivitiesRef.orderByChild('operator')
        .equalTo(uid)
        .once('value')
        .then((data) => {
          byAssignee = data.val();
        })
        .catch((error) => Promise.reject(error));
      return byAssignee;

    case EmployeeType.Volunteer:
      await ActivitiesRef.orderByChild('assignee')
        .equalTo(uid)
        .once('value')
        .then((data) => {
          byAssignee = data.val();
        })
        .catch((error) => Promise.reject(error));
      await ActivitiesRef.orderByChild('status')
        .equalTo(ActivityStatus.ReadyForAssignment)
        .once('value')
        .then((data) => {
          byAvailabilityValues = data.val();
        })
        .catch((error) => Promise.reject(error));
      return Promise.resolve({ ...byAvailabilityValues, ...byAssignee });

    default:
      return Promise.reject({ code: 'Bad Employee type' });
  }
};

const fetchDataRequested = () => ({ type: GET_ACTIVITIES_PENDING });
const fetchDataFulfilled = (payload) => ({ type: GET_ACTIVITIES_DONE, payload });
const fetchDataFailed = (payload) => ({ type: GET_ACTIVITIES_FAIL, payload });

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
        .then((data) => fetchDataFulfilled(data))
        .catch((error) => fetchDataFailed({ error: error.code }))
    )
  );

export default [startFetchActivities, fetchActivities];
