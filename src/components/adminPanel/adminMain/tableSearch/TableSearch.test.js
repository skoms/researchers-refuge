import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '../../../../utils/testing';
import TableSearch from './TableSearch';

const needsStore = true;

describe('TableSearch', () => {
  
  beforeEach(() => {
    renderComponent(TableSearch, { needsStore });
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
