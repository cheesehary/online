import React from 'react';
import { render } from 'react-dom';
import { StoreProvider } from './store';

const Root = () => {
  return (
    <StoreProvider>
      <div>Cuisine</div>
    </StoreProvider>
  );
};

render(<Root />, document.getElementById('app'));
