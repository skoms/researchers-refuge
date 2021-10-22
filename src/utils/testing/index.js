/* eslint-disable react/forbid-foreign-prop-types */
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { reducers } from '../../app/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

/**
 * Assertion method to test if the props comply with .propTypes of that component
 * @param {object} component - React Component to test prop types of
 * @param {object} expectedProps - Example prop types that are to be expected
 */
export const expectNoPropTypeErrors = (component, expectedProps) => {
  PropTypes.checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
}

/**
 * Creates and returns a new instance of the store
 * @param {object} preloadedState - state the store should be created with instead of initialState
 * @returns a store instance
 */
export const testStore = (preloadedState = null) => {
  if (preloadedState) {
    return configureStore({
      reducer: reducers,
      preloadedState,
    });
  } else if (preloadedState === null) {
    return configureStore({
      reducer: reducers
    });
  }
};

/**
 * Returns the initial state of the store
 * @returns {object} Store's initialState
 */
export const getInitialState = () => ({
  ...testStore().getState()
})

/**
 * Renders a component according to options
 * @param {object} Component - React Component to render
 * @param {object} options - Structure with default states: { expectedProps = {}, preloadedState = null, needsStore = false, needsMemoryRouter = false }
 * @returns {object} - returns an object with the store: { store }
 */
export const renderComponent = ( Component, { expectedProps = {}, preloadedState = null, needsStore = false, needsMemoryRouter = false }) => {
  if( !needsStore ) {
    render(<Component {...expectedProps} />);
  } else if ( needsStore && !needsMemoryRouter ) {
    const store = testStore(preloadedState);
    render(
      <Provider store={store}>
          <Component {...expectedProps} />
      </Provider>
    );
    return { store };
  } else if ( needsStore && needsMemoryRouter ) {
    const store = testStore(preloadedState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Component {...expectedProps} />
        </MemoryRouter>
      </Provider>
    );
    return { store };
  }
}