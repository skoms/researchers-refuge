import { cleanup, screen, waitFor } from '@testing-library/react';
import { getInitialState, renderComponent } from '../../../utils/testing';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import ArticleCards from './ArticleCards';

jest.mock('axios');

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
  useLocation: jest.fn(),
}));

const initialState = getInitialState();
const needsStore = true;
const tempArticles = [];
for (let i = 0; i < 15; i++) {
  tempArticles.push({
    id: i,
    title: 'test title'+i,
    topic: 'test',
    intro: 'test intro'+i,
    body: 'test body'+i,
    tags: ['test tag1', 'test tag2', 'test tag3'],
    published: '2020-01-01T10:10:10.769Z',
    credits: 0,
    blocked: false,
    topicId: 1,
    userId: 1,
    User: {
      firstName: 'test',
      lastName: 'user'
    }
  })
}

describe('ArticleCards', () => {

  afterAll(() => {
    cleanup();
    jest.restoreAllMocks();
  })

  describe('feed', () => {
    const expectedProps = {
      type: 'feed'
    }

    beforeEach(() => {
      const preloadedState = {
        ...initialState,
        feed: {
          ...initialState.feed,
          feedArticles: tempArticles
        }
      }
      act(() => { 
        renderComponent(ArticleCards, { expectedProps, preloadedState, needsStore })
      });
    });

    it('should render without any errors', () => {
      expect(
        screen.getByTestId('article-cards-component')
      ).toBeInTheDocument();
    });

    it('should render all the supplied article cards', () => {
      expect(
        screen.getAllByRole('heading', { name: /test title/i }).length
      ).toBe(15);
    });
    
  });

  describe('ownersArticles', () => {
    const expectedProps = {
      type: 'ownersArticles'
    }

    beforeEach(() => {
      const preloadedState = {
        ...initialState,
        userFeed: {
          ...initialState.userFeed,
          userArticles: tempArticles
        }
      }
      act(() => {
        renderComponent(ArticleCards, { expectedProps, preloadedState, needsStore });
      });
    });

    it('should render without any errors', () => {
      expect(
        screen.getByTestId('article-cards-component')
      ).toBeInTheDocument();
    });

    it('should render all the supplied article cards', () => {
      expect(
        screen.getAllByRole('heading', { name: /test title/i }).length
      ).toBe(15);
    });
    
  });

  describe('accreditedArticles', () => {
    const expectedProps = {
      type: 'accreditedArticles',
      recentlyAccredited: tempArticles.map( article => article.id ).slice(0,5)
    }

    beforeEach( async () => {
      await axios.mockResolvedValue({ status: 200, data: {
          id: 1,
          title: 'test title',
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
            lastName: 'user'
          }
        } 
      })
      
      await act( async () => {
        await renderComponent(ArticleCards, { expectedProps, needsStore });
      });
    });

    afterEach(() => {
      cleanup();
    });

    it('should render loading without any errors', async () => {
      expect(
        screen.getByTestId('article-cards-component')
      ).toBeInTheDocument();
      await waitFor(() => {
        expect(
          screen.queryByTestId('loading-component')
        ).not.toBeInTheDocument();
      })
    });

    it('should render all the supplied article cards', async () => {
      const cardTitles = await screen.findAllByText(/test title/i);
      expect(
        cardTitles
      ).toHaveLength(5);
    });
    
  });

  describe('results', () => {
    const expectedProps = {
      type: 'results'
    }

    beforeEach(() => {
      const preloadedState = {
        ...initialState,
        searchResults: {
          ...initialState.searchResults,
          articles: tempArticles
        }
      }
      act(() => {
        renderComponent(ArticleCards, { expectedProps, preloadedState, needsStore });
      });
    });

    it('should render without any errors', () => {
      expect(
        screen.getByTestId('article-cards-component')
      ).toBeInTheDocument();
    });

    it('should render all the supplied article cards', () => {
      expect(
        screen.getAllByRole('heading', { name: /test title/i }).length
      ).toBe(15);
    });
    
  });
  

});