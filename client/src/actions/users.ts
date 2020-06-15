import { EmployeeType } from 'common/constants';
import { EDIT_USER_PENDING, editUserPending } from '../interfaces/actions/users';

export const editUser = (id: string, type: EmployeeType): editUserPending => ({
  type: EDIT_USER_PENDING,
  payload: { id, type },
});
