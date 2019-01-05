import { User, Types } from './util';

export const setUser = (user: User) => ({
  type: Types.SetUser,
  payload: user
});
