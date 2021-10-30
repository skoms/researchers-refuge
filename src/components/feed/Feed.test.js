import { screen, act } from '@testing-library/react';
import { renderComponent } from '../../utils/testing';
import Feed from './Feed';


const needsStore = true;
const needsMemoryRouter = true;

describe('Feed', () => {
  
  beforeEach( async () => {
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
    expect( articles ).toHaveLength(15);
  });

})
