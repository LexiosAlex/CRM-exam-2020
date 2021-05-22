import firebase from 'firebase';
import { EmployeeType } from 'common/index';
import { REFS } from '../utils/refs';
import {
  GET_USERS_PENDING,
  GET_USERS_DONE,
  GET_USERS_FAIL,
  getUsersActions,
  getUsersFail,
} from '../interfaces/actions/users';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { Action, isOfType } from 'typesafe-actions';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { IAppState } from '../interfaces/state';
import { notify } from './notification';
import selectors from '../selectors';

const firebasePrefix: string = '@@reactReduxFirebase';

type Snapshot = firebase.database.DataSnapshot;

const getQuery = async (firebaseState): Promise<Snapshot> => {
  const {
    profile: { type },
  } = firebaseState;

  if (type === EmployeeType.Volunteer) {
    return Promise.reject({ code: 'PERMISSION_DENIED' });
  }

  const usersRef = firebase.database().ref(REFS.EMPLOYEES);

  return usersRef.once('value');
};

const fetchDataRequested = () => ({ type: GET_USERS_PENDING });
const fetchDataFulfilled = (payload): getUsersActions => ({ type: GET_USERS_DONE, payload });
const fetchDataFailed = ({ error }): getUsersActions => ({
  type: GET_USERS_FAIL,
  payload: { error },
});

const startFetchUsers = (action$: ActionsObservable<Action>, state$: StateObservable<IAppState>) =>
  action$.pipe(
    ofType(`${firebasePrefix}/SET_PROFILE`),
    withLatestFrom(state$),
    filter(([action, state$]) => selectors.user.getEmployeeType(state$) !== EmployeeType.Volunteer),
    map(() => fetchDataRequested()),
  );

const fetchUsers = (action$: ActionsObservable<Action>, state$: StateObservable<IAppState>) =>
  action$.pipe(
    ofType(`${firebasePrefix}/SET_PROFILE`),
    withLatestFrom(state$),
    filter(([action, state$]) => selectors.user.getEmployeeType(state$) !== EmployeeType.Volunteer),
    switchMap(([action, state]) =>
      getQuery(state.firebase)
        .then((data) => fetchDataFulfilled(data.val() || {}))
        .catch((error) => fetchDataFailed({ error: error.code })),
    ),
  );

const onFetchDataError = (action$: ActionsObservable<getUsersFail>) =>
  action$.pipe(
    filter(isOfType(GET_USERS_FAIL)),
    map((action) =>
      notify(`Unexpected error while loading usersData. Code: ${action.payload.error}`),
    ),
  );

export default [startFetchUsers, fetchUsers, onFetchDataError];
