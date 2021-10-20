/* eslint-disable react/forbid-foreign-prop-types */
import PropTypes from 'prop-types';
import { configureStore } from '@reduxjs/toolkit';
import { reducers } from '../../app/store';

// Will throw an error on type error because of 'jest-prop-type-error' library
export const expectNoPropTypeErrors = (component, expectedProps) => {
  PropTypes.checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
}

export const testStore = (preloadedState) => {
  return configureStore({
    reducer: reducers,
    preloadedState,
  });
};