import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '../../../utils/testing';
import AdminSidebar from './AdminSidebar';

const mockSelect = jest.fn();
const expectedProps = {
  select: mockSelect
}
const needsStore = true;


describe('AdminSidebar', () => {
  
  beforeEach(() => {
    renderComponent(AdminSidebar, { expectedProps, needsStore });
  });

  afterEach(() => {
    mockSelect.mockRestore();
  })

  it('should render without any errors', () => {
    expect(
      screen.getByText(/admin panel/i)
    ).toBeInTheDocument();
  });

  it('should call the "select" callback when content selected', () => {
    userEvent.click(screen.getByRole('button', { name: /statistics/i }));
    expect(
      mockSelect
    ).toHaveBeenCalledTimes(1);
  });

  it('should not call the "select" callback when clicking "Access Management"', () => {
    userEvent.click(screen.getByRole('button', { name: /access management/i }));
    expect(
      mockSelect
    ).toHaveBeenCalledTimes(0);
  });

  it('should call "select" when clicking menu option', () => {
    userEvent.click(screen.getByRole('button', { name: /access management/i }));
    userEvent.click(screen.getByRole('button', { name: /user management/i }));
    expect(
      mockSelect
    ).toHaveBeenCalledTimes(1);
  });

  it('should toggle on menu when clicking "Access Management" Button', () => {
    userEvent.click(screen.getByRole('button', { name: /access management/i }));
    expect(
      screen.getByTestId('dropdown')
    ).toHaveClass('active');
  });

  it('should toggle off menu when clicking "Access Management" Button again', () => {
    userEvent.click(screen.getByRole('button', { name: /access management/i }));
    userEvent.click(screen.getByRole('button', { name: /access management/i }));
    expect(
      screen.getByTestId('dropdown')
    ).not.toHaveClass('active');
  });

  it('should toggle off menu when clicking somewhere else', () => {
    userEvent.click(screen.getByRole('button', { name: /access management/i }));
    userEvent.click(screen.getByText(/admin panel/i));
    expect(
      screen.getByTestId('dropdown')
    ).not.toHaveClass('active');
  });

})
