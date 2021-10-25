import { act, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { getInitialState, renderComponent } from '../../utils/testing';
import RecPeople from './RecPeople';

jest.mock('axios')

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
const mockUsers = [
  {
    id: 1,
    firstName: 'test',
    lastName: 'user1',
    occupation: 'test occupation1',
    profileImgURL: 'https://img.icons8.com/ios-glyphs/60/FFFFFF/user--v1.png',
    followers: [1,2,3,4]
  },
  {
    id: 2,
    firstName: 'test',
    lastName: 'user2',
    occupation: 'test occupation2',
    profileImgURL: 'https://img.icons8.com/ios-glyphs/60/FFFFFF/user--v1.png',
    followers: [1,2,3,4]
  },
  {
    id: 3,
    firstName: 'test',
    lastName: 'user3',
    occupation: 'test occupation3',
    profileImgURL: 'https://img.icons8.com/ios-glyphs/60/FFFFFF/user--v1.png',
    followers: [1,2,3,4]
  },
];

describe('RecPeople', () => {

  afterAll(() => {
    jest.restoreAllMocks();
  })
  
  describe('With results', () => {

    it('should render without any errors', async () => {
      await axios.mockResolvedValueOnce({
        status: 200,
        data: mockUsers
      });

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
      await axios.mockResolvedValueOnce({
        status: 200,
        data: []
      });

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
