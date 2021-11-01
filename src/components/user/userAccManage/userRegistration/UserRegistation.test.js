import { renderComponent } from '../../../../utils/testing';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserRegistration from './UserRegistration';
import { server } from '../../../../mocks/server';
import { rest } from 'msw';

const mockHistoryPush = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual(),
  useHistory: () => ({ push: mockHistoryPush }),
  useLocation: () => ({ pathname: '/' }),
}));

const mockOnClick = jest.fn();

const options = {
  needsMemoryRouter: true,
  needsStore: true
}

describe('UserRegistration', () => {
  
  it('should render without any errors', () => {
    const { getByRole } = renderComponent(UserRegistration, options);
    expect(
      getByRole('heading', { name: /register/i })
    ).toBeInTheDocument();
  });

  it('should correctly update input fields', () => {
    const { getByLabelText } = renderComponent(UserRegistration, options);
    userEvent.type(
      getByLabelText(/email/i),
      'test@email.com'
    );
    userEvent.type(
      getByLabelText(/password/i),
      'testPass12'
    );
    expect([
      getByLabelText(/email/i).value,
      getByLabelText(/password/i).value.length
    ]).toStrictEqual(['test@email.com', 10]);
  });

  it('should successfully sign up', async () => {
    const { getByLabelText, getByRole } = renderComponent(UserRegistration, options);
    userEvent.type( getByLabelText(/first name/i), 'test' );
    userEvent.type( getByLabelText(/last name/i), 'user' );
    userEvent.type( getByLabelText(/email/i), 'test@email.com' );
    userEvent.type( getByLabelText(/password/i), 'testPass123' );
    userEvent.type( getByLabelText(/confirm/i), 'testPass123' );
    userEvent.click(getByRole('button', { name: /sign up/i }))
    await waitFor(() => {
      expect(
        mockHistoryPush
      ).toHaveBeenCalledWith({ pathname: '/' });
    })
  });

  it('should not allow sign up and show errors', async () => {
    server.use(
      rest.post('*/users', (req, res, ctx) => res( ctx.status(400), ctx.json({ message: ['Please enter a valid email address', 'Passwords dont match'] }) ))
    )
    const { getByLabelText, getByRole } = renderComponent(UserRegistration, options);
    userEvent.type( getByLabelText(/email/i), 'testemail.com' );
    userEvent.type( getByLabelText(/password/i), 'testPass12' );
    userEvent.type( getByLabelText(/confirm/i), 'testPass123' );
    getByRole('button', { name: /sign up/i }).onclick = mockOnClick;
    userEvent.click(getByRole('button', { name: /sign up/i }))
    await waitFor(() => {
      expect(
        mockHistoryPush
      ).not.toHaveBeenCalled();
      expect(
        mockOnClick
      ).not.toHaveBeenCalled();
      expect(
        getByLabelText(/email/i).parentElement
      ).toHaveClass('mismatch');
      expect(
        getByLabelText(/confirm/i).parentElement
      ).toHaveClass('mismatch');
    })
  });

  it('should forward to /error on server error', async () => {
    server.use(
      rest.post('*/users', (req, res, ctx) => res( ctx.status(201) )),
      rest.get('*/users/me', (req, res, ctx) => res( ctx.status(500) ))
    )
    const { getByLabelText, getByRole } = renderComponent(UserRegistration, options);
    userEvent.type( getByLabelText(/first name/i), 'test' );
    userEvent.type( getByLabelText(/last name/i), 'user' );
    userEvent.type( getByLabelText(/email/i), 'test@email.com' );
    userEvent.type( getByLabelText(/password/i), 'testPass123' );
    userEvent.type( getByLabelText(/confirm/i), 'testPass123' );
    userEvent.click(getByRole('button', { name: /sign up/i }))
    await waitFor(() => {
      expect(
        mockHistoryPush
      ).toHaveBeenCalledWith('/error');
    })
  });

  it('should send back to home route', async () => {
    const { getByRole } = renderComponent(UserRegistration, options);

    userEvent.click(getByRole('button', { name: /cancel/i }))
    await waitFor(() => {
      expect(
        mockHistoryPush
      ).toHaveBeenCalledWith('/');
    })
  });
  
})