import { renderComponent } from '../../../../utils/testing';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserLogin from './UserLogin';
import { server } from '../../../../mocks/server';
import { rest } from 'msw';

const mockHistoryPush = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual(),
  useHistory: () => ({ push: mockHistoryPush }),
  useLocation: () => ({ pathname: '/' }),
}));

const options = {
  needsMemoryRouter: true,
  needsStore: true
}

describe('UserLogin', () => {
  
  it('should render without any errors', () => {
    const { getByRole } = renderComponent(UserLogin, options);
    expect(
      getByRole('heading', { name: /login/i })
    ).toBeInTheDocument();
  });

  it('should correctly update input fields', () => {
    const { getByLabelText } = renderComponent(UserLogin, options);
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

  it('should successfully sign in', async () => {
    const { getByLabelText, getByRole } = renderComponent(UserLogin, options);
    userEvent.type(
      getByLabelText(/email/i),
      'test@email.com'
    );
    userEvent.type(
      getByLabelText(/password/i),
      'testPass12'
    );
    userEvent.click(getByRole('button', { name: /sign in/i }))
    await waitFor(() => {
      expect(
        mockHistoryPush
      ).toHaveBeenCalledWith({ pathname: '/' });
    })
  });

  it('should fail sign in and show errors', async () => {
    server.use(
      rest.get('*/users/me', (req, res, ctx) => res( ctx.status(401), ctx.json({ message: ['Access Denied:', 'Wrong email and/or password'] }) ))
    )
    const { getByLabelText, getByRole, getByText } = renderComponent(UserLogin, options);
    userEvent.type(
      getByLabelText(/email/i),
      'test@email.com'
    );
    userEvent.type(
      getByLabelText(/password/i),
      'testPass12'
    );
    userEvent.click(getByRole('button', { name: /sign in/i }))
    await waitFor(() => {
      expect(
        mockHistoryPush
      ).not.toHaveBeenCalled();
      expect(
        getByText(/access denied/i)
      ).toBeInTheDocument();
    })
  });

  it('should forward to /error on server error', async () => {
    server.use(
      rest.get('*/users/me', (req, res, ctx) => res( ctx.status(500) ))
    )
    const { getByLabelText, getByRole } = renderComponent(UserLogin, options);
    userEvent.type(
      getByLabelText(/email/i),
      'test@email.com'
    );
    userEvent.type(
      getByLabelText(/password/i),
      'testPass12'
    );
    userEvent.click(getByRole('button', { name: /sign in/i }))
    await waitFor(() => {
      expect(
        mockHistoryPush
      ).toHaveBeenCalledWith({ pathname: '/error', state: { from: '/' }});
    })
  });

  it('should send back to home route', async () => {
    const { getByRole } = renderComponent(UserLogin, options);

    userEvent.click(getByRole('button', { name: /cancel/i }))
    await waitFor(() => {
      expect(
        mockHistoryPush
      ).toHaveBeenCalledWith('/');
    })
  });

})
