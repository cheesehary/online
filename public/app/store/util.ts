import { useReducer } from 'react';

export enum Types {
  SetUser
}

export interface User {
  _id: string;
  name: string;
  img: string;
}

export interface State {
  user: User;
}

export interface Action {
  type: Types;
  payload?: User;
}

export interface MiddlewareInput {
  getState: () => State;
  dispatch: React.Dispatch<Action>;
}

export interface Middleware {
  (middlewareInput: MiddlewareInput): (
    dispatch: React.Dispatch<Action>
  ) => React.Dispatch<Action>;
}

const compose = <T>(funcs: Array<Function>) => (d: T): T => {
  return funcs.reduceRight((composed, f) => f(composed), d);
};

export const createStore = (
  reducer: React.Reducer<State, Action>,
  initialState: State,
  middlewares?: Array<Middleware>
) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  if (!(middlewares && middlewares.length)) return { state, dispatch };
  const middlewareInput = {
    getState: () => state,
    dispatch
  };
  const enhancers = middlewares.map(middleware => middleware(middlewareInput));
  const enhancedDispatch = compose<React.Dispatch<Action>>(enhancers)(dispatch);
  return { state, dispatch: enhancedDispatch };
};
