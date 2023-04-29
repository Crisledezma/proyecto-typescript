import { UPDATE_USERS } from './index';
import { IUser } from '../../models/IUser';

export const updateUsers = (payload: IUser[]) => ({
  type: UPDATE_USERS,
  payload,
})