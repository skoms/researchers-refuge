import { act, screen } from '@testing-library/react';
import { renderComponent } from '../../../utils/testing';
import ManageArticle from './ManageArticle';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => ({ pathname: 'update' }),
}));

const needsStore = true;
const needsMemoryRouter = true;

describe('ManageArticle: General', () => {
  beforeEach(() => {
    act(() => { renderComponent( ManageArticle, { needsStore, needsMemoryRouter } )});
  });

  it('should render without any issues', () => {
    expect(
      screen.getByTestId('manage-article-component')
    ).toBeInTheDocument();
  });

  it('should render the update form', () => {
    expect(
      screen.getByRole('heading', { name: /update article/i })
    ).toBeInTheDocument()
  });
});
