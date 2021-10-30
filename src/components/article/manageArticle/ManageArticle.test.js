import { act, screen } from '@testing-library/react';
import { renderComponent } from '../../../utils/testing';
import ManageArticle from './ManageArticle';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => ({ pathname: '/update' }),
  useParams: () => ({ id: '1' }),
}))

const options = {
  needsStore: true,
  needsMemoryRouter: true,
}

describe('ManageArticle: General', () => {
  beforeEach(() => {
    act(() => { renderComponent( ManageArticle, options )});
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
