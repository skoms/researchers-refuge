import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EntriesSelect from './EntriesSelect';
import { testStore } from '../../../../utils/testing';
import { Provider } from 'react-redux';

const renderComponent = () => {
  render(
    <Provider store={testStore()}>
      <EntriesSelect />
    </Provider>
  )
}

describe('Entries Select', () => {
  
  beforeEach(() => {
    renderComponent();
  });

  it('should render without any errors', () => {
    expect(
      screen.getByText(/show/i)
    ).toBeInTheDocument();
  });

  it('should render select with initial value 5', () => {
    expect(
      screen.getByRole('option', { name: '5' }).selected
    ).toBe(true);
  });

  it('should call changeHandler on change', () => {
    const selectElement = screen.getByRole('combobox');
    const mockChangeHandler = jest.fn();
    selectElement.onchange = mockChangeHandler;

    userEvent.selectOptions(
      selectElement, 
      screen.getByRole('option', { name: '10' })
    );
    
    expect(
      mockChangeHandler
    ).toHaveBeenCalledTimes(1);
  });

  it('should change correctly change selected on change', () => {
    const selectElement = screen.getByRole('combobox');

    userEvent.selectOptions(
      selectElement, 
      screen.getByRole('option', { name: '10' })
    );
    
    expect(
      screen.getByRole('option', { name: '10' }).selected
    ).toBe(true);
  });
})
