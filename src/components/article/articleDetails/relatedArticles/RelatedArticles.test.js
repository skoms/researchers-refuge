import { cleanup, waitFor } from '@testing-library/react';
import { renderComponent } from '../../../../utils/testing';
import RelatedArticles from './RelatedArticles';
import { server } from '../../../../mocks/server';
import { rest } from 'msw';

jest.mock('react-router', () => ({
  ...jest.requireActual,
  useHistory: () => ({ push: jest.fn() }),
  useLocation: () => ({ pathname: '/' }),
}));

const options = {
  needsStore: true,
  expectedProps: {
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
}

describe('RelatedArticles', () => {

  describe('with related articles', () => {
    afterAll(() => {
      cleanup();
      jest.restoreAllMocks();
    });
    
    it('should render without any errors', async () => {
      const { findAllByRole } = renderComponent(RelatedArticles, options)
      expect(
        await findAllByRole('heading', { name: /test title/i })
      ).toHaveLength(5);
    });
  });

  describe('without related articles', () => {
    afterAll(() => {
      cleanup();
      jest.restoreAllMocks();
    });
    
    it('should not render at all if no related articles returned', async () => {
      server.use(
        rest.get('*', (req, res, ctx) => {
          return res( ctx.status(200), ctx.json([]) );
        })
      )
      const { queryAllByRole } = renderComponent(RelatedArticles, options);
      await waitFor(() => {
        expect(
          queryAllByRole('heading', { name: /test title/i })
        ).toHaveLength(0);
      })
    });
  })
})
