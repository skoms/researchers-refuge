import { cleanup, screen } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import ArticleDetails from './ArticleDetails';
import { getInitialState, renderComponent } from '../../../utils/testing';

jest.mock('axios');

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({ id: 1 }),
}));

const initialState = getInitialState();
const needsStore = true;
const needsMemoryRouter = true;

const mockArticleInfo = {
  id: 2,
  title: 'test main title',
  topic: 'test',
  intro: 'test intro',
  body: 'test body',
  tags: ['test tag1', 'test tag2', 'test tag3'],
  published: '2020-01-01T10:10:10.769Z',
  credits: 0,
  blocked: false,
  topicId: 1,
  userId: 1,
  User: {
    id:1,
    firstName:"test",
    lastName:"user",
    profileImgURL: 'https://img.icons8.com/ios-filled/120/38B6FF/microsoft-admin.png',
    accessLevel: 'none',
    occupation: 'tester',
    bio: 'test bio',
    mostActiveField: 'testing',
    articles: 2,
    credits: 999,
    followers: [1,2,3,4],
    following: [1,2,3,4],
  }
}
const mockRelatedArticles = [
  {
    id: 1,
    title: 'test related title',
    topic: 'test',
    intro: 'test intro',
    body: 'test body',
    tags: ['test tag1', 'test tag2', 'test tag3'],
    published: '2020-01-01T10:10:10.769Z',
    credits: 0,
    blocked: false,
    topicId: 1,
    userId: 1,
    User: {
      firstName: 'test',
      lastName: 'author',
    }
  }
];

describe('ArticleDetails', () => {

  describe('general', () => {
    const preloadedState = {
      ...initialState
    }

    afterAll(() => {
      cleanup();
      jest.restoreAllMocks();
    });
  
    beforeEach( async () => {
      await axios.mockResolvedValueOnce({ 
        status: 200, 
        data: mockArticleInfo
      });

      await axios.mockResolvedValue({ 
        status: 200, 
        data: mockRelatedArticles
      });
      
      await act( async () => {
        await renderComponent(
          ArticleDetails, 
          { preloadedState, needsStore, needsMemoryRouter }
        );
      });
    });
  
    afterEach(() => {
      cleanup();
    });
    
    it('should render without any errors', async () => {
      expect(
        await screen.findByRole('heading', { name: /test main title/i })
      ).toBeInTheDocument();
    });

    it('should render info module', () => {
      expect(
        screen.getByText(/test bio/i)
      ).toBeInTheDocument();
    });

    it('should render related articles module', async () => {
      expect(
        await screen.findByRole('heading', { name: /test related title/i })
      ).toBeInTheDocument();
    });
  });
  
  describe('from owners POV', () => {
    const preloadedState = {
      ...initialState,
      userAcc: {
        loggedIn: true,
        authenticatedUser: {
          id:1,
          firstName:"test",
          lastName:"user",
          accessLevel:"none"
        }
      }
    }

    afterAll(() => {
      cleanup();
      jest.restoreAllMocks();
    });
  
    beforeEach( async () => {
      await axios.mockResolvedValueOnce({ 
        status: 200, 
        data: mockArticleInfo
      });
      
      await act( async () => {
        await renderComponent(
          ArticleDetails, 
          { preloadedState, needsStore, needsMemoryRouter }
        );
      });
    });
  
    afterEach(() => {
      cleanup();
    });
    
    it('should render without any errors', async () => {
      expect(
        await screen.findByRole('heading', { name: /test main title/i })
      ).toBeInTheDocument();
    });

    it('should render owner buttons', () => {
      expect(
        screen.getAllByRole('button', { name: /(edit)|(delete) article/i })
      ).toHaveLength(2);
    });

    it('should not render report button', () => {
      expect(
        screen.queryByRole('button', { name: /report article/i })
      ).toBeNull();
    });
  });

  describe('from non-owners POV', () => {
    const preloadedState = {
      ...initialState,
      userAcc: {
        loggedIn: true,
        authenticatedUser: {
          id:14,
          firstName:"tester",
          lastName:"superpremium",
          accessLevel:"none"
        }
      }
    }

    afterAll(() => {
      cleanup();
      jest.restoreAllMocks();
    });
  
    beforeEach( async () => {
      await axios.mockResolvedValueOnce({ 
        status: 200, 
        data: mockArticleInfo
      });
      
      await act( async () => {
        await renderComponent(
          ArticleDetails, 
          { preloadedState, needsStore, needsMemoryRouter }
        );
      });
    });
  
    afterEach(() => {
      cleanup();
    });
    
    it('should render without any errors', async () => {
      expect(
        await screen.findByRole('heading', { name: /test main title/i })
      ).toBeInTheDocument();
    });

    it('should not render owner buttons', () => {
      expect(
        screen.queryAllByRole('button', { name: /(edit)|(delete) article/i })
      ).toHaveLength(0);
    });

    it('should render report button', () => {
      expect(
        screen.getByRole('button', { name: /report article/i })
      ).toBeInTheDocument();
    });
  });
  
  describe('from admins POV (not the owner)', () => {
    const preloadedState = {
      ...initialState,
      userAcc: {
        loggedIn: true,
        authenticatedUser: {
          id:14,
          firstName:"tester",
          lastName:"superpremium",
          accessLevel:"admin"
        }
      }
    }

    afterAll(() => {
      cleanup();
      jest.restoreAllMocks();
    });
  
    beforeEach( async () => {
      await axios.mockResolvedValueOnce({ 
        status: 200, 
        data: mockArticleInfo
      });
      
      await act( async () => {
        await renderComponent(
          ArticleDetails, 
          { preloadedState, needsStore, needsMemoryRouter }
        );
      });
    });
  
    afterEach(() => {
      cleanup();
    });
    
    it('should render without any errors', async () => {
      expect(
        await screen.findByRole('heading', { name: /test main title/i })
      ).toBeInTheDocument();
    });

    it('should render owner buttons', () => {
      expect(
        screen.getAllByRole('button', { name: /(edit)|(delete) article/i })
      ).toHaveLength(2);
    });

    it('should render report button', () => {
      expect(
        screen.getByRole('button', { name: /report article/i })
      ).toBeInTheDocument();
    });
  });

  describe('from admins/owners POV', () => {
    const preloadedState = {
      ...initialState,
      userAcc: {
        loggedIn: true,
        authenticatedUser: {
          id:1,
          firstName:"test",
          lastName:"user",
          accessLevel:"admin"
        }
      }
    }

    afterAll(() => {
      cleanup();
      jest.restoreAllMocks();
    });
  
    beforeEach( async () => {
      await axios.mockResolvedValueOnce({ 
        status: 200, 
        data: mockArticleInfo
      });
      
      await act( async () => {
        await renderComponent(
          ArticleDetails, 
          { preloadedState, needsStore, needsMemoryRouter }
        );
      });
    });
  
    afterEach(() => {
      cleanup();
    });
    
    it('should render without any errors', async () => {
      expect(
        await screen.findByRole('heading', { name: /test main title/i })
      ).toBeInTheDocument();
    });

    it('should render owner buttons', () => {
      expect(
        screen.getAllByRole('button', { name: /(edit)|(delete) article/i })
      ).toHaveLength(2);
    });

    it('should render report button', () => {
      expect(
        screen.getByRole('button', { name: /report article/i })
      ).toBeInTheDocument();
    });
  })

})
