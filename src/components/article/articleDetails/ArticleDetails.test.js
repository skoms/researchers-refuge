import { cleanup, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ArticleDetails from './ArticleDetails';
import { getInitialState, getMockUsers, renderComponent } from '../../../utils/testing';

const initialState = getInitialState();
const needsStore = true;
const needsMemoryRouter = true;

jest.mock('react-router', () => ({
  ...jest.requireActual,
  useHistory: () => ({ push: jest.fn() }),
  useLocation: () => ({ pathname: '/1' }),
  useParams: () => ({ id: '1' }),
}))

describe('ArticleDetails', () => {

  describe('general', () => {
    const options = {
      needsStore,
      needsMemoryRouter,
      preloadedState: {
        ...initialState
      }
    }
  
    beforeEach( async () => {
      await act( async () => {
        await renderComponent( ArticleDetails, options );
      });
    });
    
    it('should render without any errors', async () => {
      expect(
        await screen.findByRole('heading', { name: /test title\d/i })
      ).toBeInTheDocument();
    });

    it('should render info module', async () => {
      expect(
        await screen.findByText(/test bio/i)
      ).toBeInTheDocument();
    });

    it('should render related articles module', async () => {
      expect(
        await screen.findByRole('heading', { name: /^related articles$/i })
      ).toBeInTheDocument();
    });
  });
  
  describe('from owners POV', () => {
    const options = {
      needsStore,
      needsMemoryRouter,
      preloadedState: {
        ...initialState,
        userAcc: {
          authenticatedUser: getMockUsers()
        }
      }
    }
  
    beforeEach( async () => {
      await act( async () => {
        await renderComponent( ArticleDetails, options );
      });
    });
    
    it('should render without any errors', async () => {
      expect(
        await screen.findByRole('heading', { name: /test title\d/i })
      ).toBeInTheDocument();
      screen.debug();
    });

    it('should render owner buttons', async () => {
      expect(
        await screen.findAllByRole('button', { name: /(edit)|(delete) article/i })
      ).toHaveLength(2);
    });

    it('should not render report button', async () => {
      await waitFor(() => {
        expect(
          screen.queryByRole('button', { name: /report article/i })
        ).toBeNull();
      });
    });
  });

  describe('from non-owners POV', () => {
    const options = {
      needsStore,
      needsMemoryRouter,
      preloadedState: {
        ...initialState,
        userAcc: {
          loggedIn: true,
          authenticatedUser: getMockUsers({ id: 14 })
        }
      }
    }
  
    beforeEach( async () => {
      await act( async () => {
        await renderComponent( ArticleDetails, options );
      });
    });
  
    afterEach(() => {
      cleanup();
    });
    
    it('should render without any errors', async () => {
      expect(
        await screen.findByRole('heading', { name: /test title\d/i })
      ).toBeInTheDocument();
    });

    it('should not render owner buttons', async () => {
      await waitFor(() => {
        expect(
          screen.queryAllByRole('button', { name: /(edit)|(delete) article/i })
        ).toHaveLength(0);
      });
    });

    it('should render report button', async () => {
      expect(
        await screen.findByRole('button', { name: /report article/i })
      ).toBeInTheDocument();
    });
  });
  
  describe('from admins POV (not the owner)', () => {
    const options = {
      needsStore,
      needsMemoryRouter,
      preloadedState: {
        ...initialState,
        userAcc: {
          loggedIn: true,
          authenticatedUser: getMockUsers({ id: 14, accessLevel: 'admin' })
        }
      }
    }
  
    beforeEach( async () => {
      await act( async () => {
        await renderComponent( ArticleDetails, options );
      });
    });
  
    afterEach(() => {
      cleanup();
    });
    
    it('should render without any errors', async () => {
      expect(
        await screen.findByRole('heading', { name: /test title\d/i })
      ).toBeInTheDocument();
    });

    it('should render owner buttons', async () => {
      expect(
        await screen.findAllByRole('button', { name: /(edit)|(delete) article/i })
      ).toHaveLength(2);
    });

    it('should render report button', async () => {
      expect(
        await screen.findByRole('button', { name: /report article/i })
      ).toBeInTheDocument();
    });
  });

  describe('from admins/owners POV', () => {
    const options = {
      needsStore,
      needsMemoryRouter,
      preloadedState: {
        ...initialState,
        userAcc: {
          loggedIn: true,
          authenticatedUser: getMockUsers({ accessLevel: 'admin' })
        }
      }
    }
  
    beforeEach( async () => {
      await act( async () => {
        await renderComponent( ArticleDetails, options );
      });
    });
  
    afterEach(() => {
      cleanup();
    });
    
    it('should render without any errors', async () => {
      expect(
        await screen.findByRole('heading', { name: /test title\d/i })
      ).toBeInTheDocument();
    });

    it('should render owner buttons', async () => {
      expect(
        await screen.findAllByRole('button', { name: /(edit)|(delete) article/i })
      ).toHaveLength(2);
    });

    it('should render report button', async () => {
      expect(
        await screen.findByRole('button', { name: /report article/i })
      ).toBeInTheDocument();
    });
  })

})
