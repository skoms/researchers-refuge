import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { testStore } from '../utils/testing';

const renderComponent = (preloadedState = null) => {
  render(
    <Provider store={testStore(preloadedState)}>
      <App />
    </Provider>
  );
}

describe('App', () => {

  beforeEach(() => {
    renderComponent();
  });

  it('should render without errors', () => {
    expect(
      screen.getByTestId('app-component')
    ).toBeInTheDocument();
  });
})
