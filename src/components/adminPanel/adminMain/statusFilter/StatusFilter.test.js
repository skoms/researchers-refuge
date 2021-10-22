import { screen } from '@testing-library/react';
import { renderComponent } from '../../../../utils/testing';
import userEvent from '@testing-library/user-event';
import StatusFilter from './StatusFilter';

const mockSetStatusFilter = jest.fn();

describe('StatusFilter', () => {
  
  beforeEach(() => {
    renderComponent(StatusFilter, { expectedProps: { setStatusFilter: mockSetStatusFilter }});
  });

  afterEach(() => {
    mockSetStatusFilter.mockRestore();
  });

  it('should render without any errors', () => {
    expect(
      screen.getAllByRole('button', { name: /(open)|(resolved)|(rejected)/i }).length
    ).toBe(3);
  });

  it('should have "open" selected by default', () => {
    expect(
      screen.getByRole('button', { name: /open/i })
    ).toHaveClass('selected');
  });

  it('should remove "selected" from previous option when selecting new option', () => {
    userEvent.click(screen.getByRole('button', { name: /rejected/i }))
    expect(
      screen.getByRole('button', { name: /open/i })
    ).not.toHaveClass('selected');
  });

  it('should add "selected" to the new option', () => {
    userEvent.click(screen.getByRole('button', { name: /rejected/i }))
    expect(
      screen.getByRole('button', { name: /rejected/i })
    ).toHaveClass('selected');
  });

})
