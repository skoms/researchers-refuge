import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '../../utils/testing';
import ConfirmationPopup from './ConfirmationPopup';

const mockConfirm = jest.fn();
const mockContainerRef = jest.fn().mockReturnValue({ current: { classList: '' } });
const mockCloseOnBlur = jest.fn();
const mockCancel = jest.fn();

describe('Confirmation Popup', () => {
  const expectedProps = {
    action: 'delete',
    target: 'user',
    confirm: mockConfirm,
    containerRef: mockContainerRef
  }

  beforeEach(() => {
    act(() => { renderComponent(ConfirmationPopup, { expectedProps }) })
  });

  afterAll(() => {
    jest.restoreAllMocks();
  })

  it('should render without any errors', () => {
    expect(
      screen.getByTestId('blurred-background')
    ).toBeInTheDocument();
  });

  it('should have the action and target props in the text', () => {
    expect(
      screen.getByText(/are you sure you want to delete this user?/i)
    ).toBeInTheDocument();
  });

  it('should call mockConfirm on pressing "yes" button', () => {
    userEvent.click( screen.getByRole('button', { name: /yes/i }) );
    expect( mockConfirm ).toHaveBeenCalledTimes(1);
  });

  it('should call mockCloseOnBlur on pressing blurred background', () => {
    screen.getByTestId('blurred-background').onclick = mockCloseOnBlur;
    userEvent.click( screen.getByTestId('blurred-background'));
    expect( mockCloseOnBlur ).toHaveBeenCalledTimes(1);
  });

  it('should call mockCancel on pressing cancel button', () => {
    screen.getByRole('button', { name: /no/i }).onclick = mockCancel;
    userEvent.click( screen.getByRole('button', { name: /no/i }));
    expect( mockCancel ).toHaveBeenCalledTimes(1);
  });
});
