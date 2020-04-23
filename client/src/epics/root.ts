import { combineEpics, Epic, ofType, StateObservable } from 'redux-observable';
import firebase from 'firebase/app';
import { mergeMap, map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

import { Action } from 'typesafe-actions';
import { AppState } from '../reducers/rootReducer';
import { REFS } from '../utils/refs';

const firebasePrefix: string = '@@reactReduxFirebase';

const getQuery = ({
  profile: { type },
  auth: { uid },
}): /*firebase.database.Reference | firebase.database.Query*/ any => {
  const ActivitiesRef = firebase.database().ref(REFS.ACTIVITIES);
  switch (type) {
    case 0:
      return ActivitiesRef;
    case 1:
      return ActivitiesRef.orderByChild('operator').equalTo(uid);
    case 2:
      return ActivitiesRef.orderByChild('assignee').equalTo(uid);
    default:
      return ActivitiesRef;
  }
};

const fetchDataFulfilled = (activities) => ({ type: 'FETCH_ACTIVITIES', payload: activities });

const fetchActivities: Epic<Action<string>, Action<any>, AppState> = (action$, state$) =>
  action$.pipe(
    ofType(`${firebasePrefix}/SET_PROFILE`),
    map(() =>
      getQuery(state$.value.firebase).on('value', (snap) => {
        const data = snap.val();
        console.log('received: ', data);
        return fetchDataFulfilled(data);
        // return from(snap.val()).pipe(map((activities) => fetchDataFulfilled(activities)));
      })
    )
  );
export default combineEpics(fetchActivities);
