import { cleanup, screen } from '@testing-library/react';
import { renderComponent } from '../../../../utils/testing';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import RelatedArticles from './RelatedArticles';

jest.mock('axios');

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
  useLocation: jest.fn(),
}));

const needsStore = true;
const tempArticles = [];
for (let i = 0; i < 5; i++) {
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
const expectedProps = {
  article: {
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
      firstName: 'test',
      lastName: 'user'
    }
  }
}

describe('RelatedArticles', () => {

  describe('with related articles', () => {
    afterAll(() => {
      cleanup();
      jest.restoreAllMocks();
    });
  
    beforeEach( async () => {
      await axios.mockResolvedValue({ 
        status: 200, 
        data: tempArticles 
      });
      
      await act( async () => {
        await renderComponent(RelatedArticles, { expectedProps, needsStore });
      });
    });
  
    afterEach(() => {
      cleanup();
    });
    
    it('should render without any errors', async () => {
      expect(
        await screen.findAllByRole('heading', { name: /test title/i })
      ).toHaveLength(5);
    });
  });

  describe('without related articles', () => {
    afterAll(() => {
      cleanup();
      jest.restoreAllMocks();
    });
  
    beforeEach( async () => {
      await axios.mockResolvedValue({ 
        status: 200, 
        data: [] 
      });
      
      await act( async () => {
        await renderComponent(RelatedArticles, { expectedProps, needsStore });
      });
    });
  
    afterEach(() => {
      cleanup();
    });
    
    it('should not render at all if no related articles returned', () => {
      expect(
        screen.queryAllByRole('heading', { name: /test title/i })
      ).toHaveLength(0);
    });
  })
})
