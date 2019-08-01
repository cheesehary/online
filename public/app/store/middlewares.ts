import React from 'react';
import { MiddlewareInput, Action } from './util';

export const logger = ({ getState }: MiddlewareInput) => (
  next: React.Dispatch<Action>
) => (action: Action) => {
  console.log(`action: `, action);
  const result = next(action);
  console.log(`next store: `, getState());
  return result;
};
