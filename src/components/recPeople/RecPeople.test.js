import { act, screen, waitFor } from '@testing-library/react';
import { getInitialState, getMockUsers, renderComponent } from '../../utils/testing';
import RecPeople from './RecPeople';
import { server } from '../../mocks/server';
import { rest } from 'msw'

const initialState = getInitialState();
const options = {
  needsStore: true,
  needsMemoryRouter: true,
  preloadedState: {
    ...initialState,
    userAcc: {
      authenticatedUser: {
        id: 10,
        firstName: 'test',
        lastName: 'user'
      }
    }
  }
}
const mockUsers = getMockUsers({ amount: 3 });

describe('RecPeople', () => {

  afterAll(() => {
    jest.restoreAllMocks();
  })
  
  describe('With results', () => {

    it('should render without any errors', async () => {
      let store;
      await act( async () => {
        store = await renderComponent(RecPeople, options).store;
      })

      await waitFor(() => {
        expect(
          store.getState().recPeople.recPeople
        ).toStrictEqual(mockUsers);
        expect(
          screen.getByRole('heading', { name: /people you may know/i })
        ).toBeInTheDocument();
      })
    });
  })
  
  describe('without results', () => {
    beforeEach( async () => { 
      
    });

    it('should not render', async () => {
      server.use(
        rest.get('*', (req, res, ctx) => res( ctx.status(200), ctx.json([]) ))
      );

      let store;
      await act( async () => {
        store = await renderComponent(RecPeople, options).store;
      })

      await waitFor(() => {
        expect(
          store.getState().recPeople.recPeople
        ).toStrictEqual([]);
        expect(
          screen.queryByRole('heading', { name: /people you may know/i })
        ).toBeNull();
      });
    });
  })

})
