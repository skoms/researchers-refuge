import React from 'react';
import { render, screen } from '@testing-library/react';
import EntriesShown from './EntriesShown';

const renderComponent = (props = {}) => {
  render( <EntriesShown {...props} /> );
}

describe('EntriesShown', () => {
  beforeEach(() => {
    const expectedProps = {
      data: {
        rangeStart: 0,
        rangeEnd: 5,
        total: 10
      }
    }
    renderComponent(expectedProps);
  });

  it('should render without any errors with props', () => {
    expect(
      screen.getByText(/Showing 0 to 5 of 10 entries/i)
    ).toBeInTheDocument();
  });

})
