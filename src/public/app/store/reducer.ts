import { State, Action, Types } from './util';

export const initialState: State = {
  user: undefined
};

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case Types.SetUser:
      return { ...state, user: action.payload };
    default:
      return { ...state };
  }
};
