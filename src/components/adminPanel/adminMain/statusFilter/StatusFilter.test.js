import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StatusFilter from './StatusFilter';

const mockSetStatusFilter = jest.fn();
const renderComponent = () => {
  render(<StatusFilter setStatusFilter={mockSetStatusFilter} />)
}

describe('StatusFilter', () => {
  
  beforeEach(() => {
    renderComponent();
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
