import { waitFor } from '@testing-library/react';
import { renderComponent, getInitialState, getMockUsers, getMockTopics, getMockArticles, getMockCategories } from '../../utils/testing';
import SearchResultsFeed from './SearchResultsFeed';
import { server } from '../../mocks/server';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

const mockHistoryPush = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual(),
  useParams: () => ({ term: 'test' }),
  useHistory: () => ({ push: mockHistoryPush }),
  useLocation: () => ({ pathname: '/search?term=test' }),
}));


const mockArticles = getMockArticles({ amount: 5 });
mockArticles.forEach( article => {
  article.User = getMockUsers({ id: article.id });
});

const initialState = getInitialState();
const options = {
  needsStore: true, 
  needsMemoryRouter: true,
  preloadedState: {
    ...initialState,
    userAcc: {
      loggedIn: true,
      authenticatedUser: getMockUsers()
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

  describe('with data results', () => {
    it('should render with data for users', async () => {
      const { store, getByText } = renderComponent(SearchResultsFeed, options);
  
      await waitFor(() => {
        expect(
          getByText(/test2 user2/i)
        ).toBeInTheDocument();
        expect(
          store.getState().searchResults.users
        ).toStrictEqual( getMockUsers({ amount: 6 }).slice(1) );
      })
    });

    it('should show next user on click', async () => {
      const { getByRole, getByText, getByAltText } = renderComponent(SearchResultsFeed, options);

      await waitFor(() => 
        expect(
          getByRole('heading', { name: /^users$/i })
        ).toBeInTheDocument()
      );

      userEvent.click(getByAltText(/next button/i));
  
      await waitFor(() => {
        expect(
          getByText(/tester3/i)
        ).toBeVisible();
      })
    });

    it('should show first user after clicking back and forth', async () => {
      const { getByRole, getByText, getByAltText } = renderComponent(SearchResultsFeed, options);

      await waitFor(() => 
        expect(
          getByRole('heading', { name: /^users$/i })
        ).toBeInTheDocument()
      );

      userEvent.click(getByAltText(/next button/i));
      await waitFor(() => {
        expect(
          getByText(/tester3/i)
        ).toBeVisible();
      })
      userEvent.click(getByAltText(/previous button/i));
  
      await waitFor(() => {
        expect(
          getByText(/tester2/i)
        ).toBeVisible();
      })
    });
  
    it('should render with data for topics', async () => {
      const { store, getByText } = renderComponent(SearchResultsFeed, options);
  
      await waitFor(() => {
        expect(
          getByText(/test category1/i)
        ).toBeInTheDocument();
        expect(
          getByText(/test topic1/i)
        ).toBeInTheDocument();
        expect(
          store.getState().searchResults.topics
        ).toStrictEqual( getMockTopics({ amount: 5 }) );
      })
    });
  
    it('should render with data for articles', async () => {
      const { store, getByText } = renderComponent(SearchResultsFeed, options);
  
      await waitFor(() => {
        expect(
          getByText(/^test title1$/i)
        ).toBeInTheDocument();
        expect(
          store.getState().searchResults.articles
        ).toStrictEqual( getMockArticles({ amount: 15 }) );
      })
    });
  });

  describe('without data results', () => {
    it('should render no results message for users', async () => {
      server.use(
        rest.get('*/users/query', (req, res, ctx) => res( ctx.status(200), ctx.json([]) ))
      );

      const { store, getByText } = renderComponent(SearchResultsFeed, options);

      await waitFor(() => {
        expect(
          getByText(/no users match your search.../i)
        ).toBeInTheDocument();
        expect(
          store.getState().searchResults.users
        ).toStrictEqual( [] );
      })
    });
  
    it('should render no results message for topics', async () => {
      server.use(
        rest.get('*/topics/query', (req, res, ctx) => res( ctx.status(200), ctx.json([]) ))
      );

      const { store, getByText } = renderComponent(SearchResultsFeed, options);
  
      await waitFor(() => {
        expect(
          getByText(/no topics match your search.../i)
        ).toBeInTheDocument();
        expect(
          store.getState().searchResults.topics
        ).toStrictEqual( [] );
      })
    });
  
    it('should render no results message for articles', async () => {
      server.use(
        rest.get('*/articles/query', (req, res, ctx) => res( ctx.status(200), ctx.json({ articles: [] }) ))
      );

      const { store, getByText } = renderComponent(SearchResultsFeed, options);
  
      await waitFor(() => {
        expect(
          getByText(/no articles match your search.../i)
        ).toBeInTheDocument();
        expect(
          store.getState().searchResults.articles
        ).toStrictEqual( [] );
      })
    });
  });
  

});

