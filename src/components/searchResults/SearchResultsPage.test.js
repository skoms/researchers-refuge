import { act, screen } from '@testing-library/react';
import { renderComponent, getInitialState, getMockUsers } from '../../utils/testing';
import SearchResultsPage from './SearchResultsPage';

const mockHistoryPush = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual(),
  useParams: () => ({ term: 'test' }),
  useHistory: () => ({ push: mockHistoryPush }),
  useLocation: () => ({ pathname: '/search?term=test' }),
}));

const mockUser = getMockUsers();

const initialState = getInitialState();

describe('SearchResultsPage', () => {
  
  describe('not on mobile (logged in)', () => {
    const options = {
      needsStore: true,
      needsMemoryRouter: true,
      preloadedState: {
        ...initialState,
        userAcc: {
          loggedIn: true,
          authenticatedUser: mockUser
        },
        screenWidth: {
          ...initialState.screenWidth,
          isMobile: false
        }
      }
    }

    beforeEach(() => {
      act(() => {
        renderComponent(SearchResultsPage, options);
      });
    });
    
    it('should render without any errors', () => {
      expect(
        screen.getByText(/search results/i)
      ).toBeInTheDocument();
    });

    it('should render InfoModule', () => {
      expect(
        screen.getByAltText(/your profile/i)
      ).toBeInTheDocument();
    });
    
  })

  describe('not on mobile (not logged in)', () => {
    const options = {
      needsStore: true,
      needsMemoryRouter: true,
      preloadedState: {
        ...initialState,
        userAcc: {
          loggedIn: false,
          authenticatedUser: null
        },
        screenWidth: {
          ...initialState.screenWidth,
          isMobile: false
        }
      }
    }

    beforeEach(() => {
      act(() => {
        renderComponent(SearchResultsPage, options);
      });
    });
    
    it('should render feed without any errors', () => {
      expect(
        screen.getByText(/search results/i)
      ).toBeInTheDocument();
    });
    
    it('should not render InfoModule', () => {
      expect(
        screen.queryByAltText(/your profile/i)
      ).toBeNull();
    });
    
  });
  
  describe('on mobile', () => {
    const options = {
      needsStore: true,
      needsMemoryRouter: true,
      preloadedState: {
        ...initialState,
        userAcc: {
          loggedIn: true,
          authenticatedUser: mockUser
        },
        screenWidth: {
          ...initialState.screenWidth,
          isMobile: true
        }
      }
    }

    beforeEach(() => {
      act(() => {
        renderComponent(SearchResultsPage, options);
      });
    });
    
    it('should render without any errors', () => {
      expect(
        screen.getByText(/search results/i)
      ).toBeInTheDocument();
    });

    it('should not render InfoModule', () => {
      expect(
        screen.queryByAltText(/your profile/i)
      ).toBeNull();
    });
    
  });
  

})
