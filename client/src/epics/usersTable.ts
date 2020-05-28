import { switchMap, filter, map, withLatestFrom } from 'rxjs/operators';
import firebase from 'firebase';
import { isOfType } from 'typesafe-actions';
import { ActionsObservable, StateObservable } from 'redux-observable';

import {
  EDIT_USER_PENDING,
  EDIT_USER_DONE,
  EDIT_USER_FAIL,
  editUserPending,
  editUserFail,
  editUserDone,
} from '../interfaces/actions/users';

import { REFS } from '../utils/refs';
import { notify } from './notification';
import { IAppState } from '../interfaces/state';

const onChangeAsyncError = (action$: ActionsObservable<editUserFail>) =>
  action$.pipe(
    filter(isOfType(EDIT_USER_FAIL)),
    map((action) => notify(`Cant change user permission. Code: ${action.payload.error}`))
  );

const changeUserType = ({ id, type }): Promise<firebase.database.DataSnapshot> => {
  const usersRef = firebase.database().ref(REFS.EMPLOYEES).child(id);
  return usersRef.update({ type });
};

const onChangeError = (error): editUserFail => ({
  type: EDIT_USER_FAIL,
  payload: { error },
});

const changeUserPermissionDone = ({ id, type }): editUserDone => ({
  type: EDIT_USER_DONE,
  payload: { id, type },
});

const onChangeUserPermission = (
  action$: ActionsObservable<editUserPending>,
  state$: StateObservable<IAppState>
) =>
  action$.pipe(
    filter(isOfType(EDIT_USER_PENDING)),
    withLatestFrom(state$),
    switchMap(([action, state]) =>
      changeUserType(action.payload)
        .then((data) => changeUserPermissionDone(action.payload))
        .catch((error) => onChangeError(error.code))
    )
  );

export default [onChangeUserPermission, onChangeAsyncError];
