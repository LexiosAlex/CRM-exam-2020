import { combineEpics, Epic, ofType, StateObservable } from 'redux-observable';
import firebase from 'firebase/app';
import { switchMap } from 'rxjs/operators';
import { Action } from 'typesafe-actions';

import { AppState } from '../reducers/rootReducer';
import { REFS } from '../utils/refs';

const firebasePrefix: string = '@@reactReduxFirebase';

const getQuery = ({ profile: { type }, auth: { uid } }): Promise<any> => {
  const ActivitiesRef = firebase.database().ref(REFS.ACTIVITIES);
  switch (type) {
    case 0:
      return ActivitiesRef.once('value');
    case 1:
      return ActivitiesRef.orderByChild('operator').equalTo(uid).once('value');
    case 2:
      return ActivitiesRef.orderByChild('assignee').equalTo(uid).once('value');
    default:
      return Promise.reject('Bad Employee type');
  }
};

const fetchDataFulfilled = (payload) => ({ type: 'GET_ACTIVITIES_DONE', payload });
const fetchDataFailed = (payload) => ({ type: 'GET_ACTIVITIES_FAIL', payload });

const fetchActivities: Epic<Action<string>, Action<any>, AppState> = (action$, state$) =>
  action$.pipe(
    ofType(`${firebasePrefix}/SET_PROFILE`),
    switchMap(() =>
      getQuery(state$.value.firebase)
        .then((data: any) => fetchDataFulfilled({ activities: data.val() }))
        .catch((error) => fetchDataFailed({ error }))
    )
  );
export default combineEpics(fetchActivities);
