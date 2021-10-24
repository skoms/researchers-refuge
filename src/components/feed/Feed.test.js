import { screen, act } from '@testing-library/react';
import axios from 'axios';
import { renderComponent } from '../../utils/testing';
import Feed from './Feed';

jest.mock('axios')

const needsStore = true;
const needsMemoryRouter = true;

const mockArticles = [
  {
    id: 1,
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
  },{
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
  },{
    id: 3,
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
]

describe('Feed', () => {
  
  beforeEach( async () => {
    await axios.mockResolvedValueOnce({ 
      status: 200, 
      data: { articles: mockArticles, hasMore: false, lastPage: 1 }
    });

    await act( async () => {
      await renderComponent(Feed, { needsStore, needsMemoryRouter });
    })
  });

  it('should render without errors', () => {
    expect(
      screen.getByTestId('feed-component')
    ).toBeInTheDocument();
  });

  it('should render MenuBar', () => {
    expect(
      screen.getByTestId('menubar-component')
    ).toBeInTheDocument();
  });

  it('should render ArticleCards', () => {
    expect(
      screen.getByTestId('article-cards-component')
    ).toBeInTheDocument();
  });

  it('should fetch and render articles', async () => {
    const articles = await screen.findAllByRole('heading', /test main title/i);
    expect( articles ).toHaveLength(3);
  });

})
