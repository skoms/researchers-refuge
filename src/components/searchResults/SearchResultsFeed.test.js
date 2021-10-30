import { act, screen, waitFor } from '@testing-library/react';
import { renderComponent, getInitialState, getMockUsers, getMockTopics, getMockArticles, getMockCategories } from '../../utils/testing';
import SearchResultsFeed from './SearchResultsFeed';

const mockHistoryPush = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual(),
  useParams: () => ({ term: 'test' }),
  useHistory: () => ({ push: mockHistoryPush }),
  useLocation: () => ({ pathname: '/search?term=test' }),
}));


const mockArticles = getMockArticles({ amount: 5 });
mockArticles.forEach( article => {
  article.User = getMockUsers();
});

const mockUser = getMockUsers();

const initialState = getInitialState();
const options = {
  needsStore: true, 
  needsMemoryRouter: true,
  preloadedState: {
    ...initialState,
    userAcc: {
      loggedIn: true,
      authenticatedUser: mockUser
    },
    topics: {
      ...initialState.topics,
      categories: getMockCategories({ amount: 4 })
    }
  }
}

describe('SearchResultsFeed', () => {
  
  it('should render without any errors', () => {
    const { getByText } = renderComponent(SearchResultsFeed, options);
    expect(
      getByText(/search results for: 'test'/i)
    ).toBeInTheDocument();
  });

  it('should render with data for users', async () => {
    const { store } = renderComponent(SearchResultsFeed, options);

    await waitFor(() => {
      expect(
        store.getState().searchResults.users
      ).toStrictEqual( getMockUsers({ amount: 6 }).slice(1) );
    })
  });

});

