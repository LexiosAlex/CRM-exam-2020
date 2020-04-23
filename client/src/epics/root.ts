import { combineEpics, Epic, ofType, StateObservable } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { AppState } from '../reducers/rootReducer';
import { Action } from 'typesafe-actions';
import { REFS } from '../utils/refs';
import { useFirebase } from 'react-redux-firebase';
import { from } from 'rxjs';

const firebasePrefix: string = '@@reactReduxFirebase';

const getQuery = (action, state) => {
  const { auth } = state;
  const { type } = action.profile;
  const firebase = useFirebase();
  const ActivitiesRef = firebase.ref(REFS.ACTIVITIES);
  switch (type) {
    case 0:
      return ActivitiesRef;
    case 1:
      return ActivitiesRef.orderByChild('operator').equalTo(auth.uid);
    case 2:
      return ActivitiesRef.orderByChild('assignee').equalTo(auth.uid);
    default:
      return ActivitiesRef;
  }
};

const fetchDataFulfilled = activities => ({ type: 'FETCH_ACTIVITIES', payload: activities });

const fetchActivities: Epic<Action, Action<any>, AppState> = (action$, state$) =>
  action$.pipe(
    ofType(`${firebasePrefix}/SET_PROFILE`),
    mergeMap((action: any) =>
      getQuery(action, state$.value.firebase).on('value', snap => {
        return from(snap.val()).pipe(map(activities => fetchDataFulfilled(activities)));
      })
    )
  );
export default combineEpics(fetchActivities);
