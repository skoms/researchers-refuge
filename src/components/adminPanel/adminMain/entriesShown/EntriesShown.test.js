import { screen } from '@testing-library/react';
import { renderComponent } from '../../../../utils/testing';
import EntriesShown from './EntriesShown';


describe('EntriesShown', () => {
  beforeEach(() => {
    const expectedProps = {
      data: {
        rangeStart: 0,
        rangeEnd: 5,
        total: 10
      }
    }
    renderComponent(EntriesShown, { expectedProps });
  });

  it('should render without any errors with props', () => {
    expect(
      screen.getByText(/Showing 0 to 5 of 10 entries/i)
    ).toBeInTheDocument();
  });

})
