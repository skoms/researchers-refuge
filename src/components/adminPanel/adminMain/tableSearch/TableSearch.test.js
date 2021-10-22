import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testStore } from '../../../../utils/testing';
import { Provider } from 'react-redux';
import TableSearch from './TableSearch';

const renderComponent = () => {
  render(
    <Provider store={testStore()}>
      <TableSearch />      
    </Provider>
  );
}

describe('TableSearch', () => {
  
  beforeEach(() => {
    renderComponent();
  });

  it('should render without any errors', () => {
    expect(
      screen.getByRole('textbox')
    ).toBeInTheDocument();
  });

  it('should not render clear button when field is empty', () => {
    expect(
      screen.queryByAltText(/clear search button/i)
    ).toBeNull();
  });

  it('should render the clear button when field is not empty', () => {
    userEvent.type(
      screen.getByRole('textbox'),
      'test string'
    );
    expect(
      screen.queryByAltText(/clear search button/i)
    ).not.toBeNull();
  });

  it('should remove clear button when no longer has input', () => {
    userEvent.type(
      screen.getByRole('textbox'),
      'test text'
    );
    userEvent.clear(screen.getByRole('textbox'));
    expect(
      screen.queryByAltText(/clear search button/i)
    ).toBeNull();
  });

  it('should call the submitHandler on search button press', () => {
    const mockSubmitHandler = jest.fn();
    screen.getByTestId('search-form').onsubmit = mockSubmitHandler;
    userEvent.type(
      screen.getByRole('textbox'),
      'test text'
    );
    userEvent.click(screen.getByAltText(/^search button/i));
    expect(
      mockSubmitHandler
    ).toHaveBeenCalledTimes(1);
  });

})
