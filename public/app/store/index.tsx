import React from 'react';
import { reducer, initialState } from './reducer';
import { createStore, Action } from './util';
import { logger } from './middlewares';

export const StoreContext = React.createContext({
  state: initialState,
  dispatch: (() => {}) as React.Dispatch<Action>
});

export const StoreProvider: React.FunctionComponent = ({ children }) => {
  const store = createStore(reducer, initialState, [logger]);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
