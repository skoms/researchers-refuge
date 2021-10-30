import { screen } from '@testing-library/react';
import { getInitialState, renderComponent } from '../../../../utils/testing';
import ArticleCard from './ArticleCard';
import userEvent from '@testing-library/user-event';

const mockHistoryPush = jest.fn();

jest.mock('react-router', () => ({
  useLocation: () => ({ pathname: '/' }),
  useHistory: () => ({
    push: mockHistoryPush
  }),
}))

const initialState = getInitialState();
const needsStore = true;
const needsMemoryRouter = true;

describe('ArticleCard', () => {
  
  describe('regardless of login status', () => {
    
    beforeEach(() => {
      const expectedProps = {
        id: 1,
        credits: 12,
        topic: 'test',
        authorId: 1,
        author: 'Boris Johnson',
        title: 'test title',
        intro: 'test intro'
      }
      renderComponent(ArticleCard, { expectedProps, needsStore, needsMemoryRouter });
    });
  
    afterEach(() => {
      mockHistoryPush.mockRestore();
    });
  
    it('should render without any errors', () => {
      expect(
        screen.getByTestId('article-card-component')
      ).toBeInTheDocument();
    });
  
    it('should render title from props', () => {
      expect(
        screen.getByRole('heading', { name: /test title/i })
      ).toBeInTheDocument();
    });
  
    it('should render correct amount of credits from props', () => {
      expect(
        screen.getByText(/12/i)
      ).toBeInTheDocument();
    });
  
    it('should render "accredit" and "discredit" buttons', () => {
      expect(
        screen.getAllByAltText(/((accredit)|(discredit)) button/i).length
      ).toBe(2);
    });
  
    it('should render buttons with default unchecked color #CECECE', () => {
      expect(
        screen.getByAltText(/accredit button/i).src
      ).toBe('https://img.icons8.com/ios-filled/20/CECECE/checkmark--v1.png');
    });
  
    it('should call the onClick handler', () => {
      const mockOnClick = jest.fn();
      screen.getByAltText(/accredit button/i).onclick = mockOnClick
      userEvent.click(screen.getByAltText(/accredit button/i));
      expect(
        mockOnClick
      ).toHaveBeenCalledTimes(1);
    });

    it('should forward you to homepage with topic when you click the topic', () => {
      userEvent.click(screen.getByRole('button', { name: /^test$/i }));
      expect(
        mockHistoryPush
      ).toHaveBeenCalledWith({ pathname: '/', state: { from: '/' }});
    });

    it('should forward you to authors user profile when you click the name', () => {
      userEvent.click(screen.getByRole('button', { name: /^boris johnson$/i }));
      expect(
        mockHistoryPush
      ).toHaveBeenCalledWith({ pathname: '/users/1', state: { from: '/' }});
    });

    it('should forward you to the article when you click the title', () => {
      userEvent.click(screen.getByRole('heading', { name: /^test title$/i }));
      expect(
        mockHistoryPush
      ).toHaveBeenCalledWith({ pathname: '/articles/1', state: { from: '/' }});
    });

    it('should forward you to the article when you click the intro', () => {
      userEvent.click(screen.getByText(/^test intro$/i));
      expect(
        mockHistoryPush
      ).toHaveBeenCalledWith({ pathname: '/articles/1', state: { from: '/' }});
    });

  });

  describe('When logged in', () => {
    const preloadedState = {
      ...initialState,
      userAcc: {
        ...initialState.userAcc,
        authenticatedUser: {
          id: 1,
          firstName: 'test',
          lastName: 'user',
          accessLevel: 'admin',
          accreditedArticles: [1]
        }
      }
    }
    const expectedProps = {
      id: 1,
      credits: 12,
      topic: 'test',
      authorId: 1,
      author: 'Boris Johnson',
      title: 'test title',
      intro: 'test intro'
    }
  
    afterEach(() => {
      mockHistoryPush.mockRestore();
    });

    it('should render accredited button marked', () => {
      renderComponent(ArticleCard, { expectedProps, preloadedState, needsStore, needsMemoryRouter });

      expect(
        screen.getByAltText(/accredit button/i).src
      ).toBe('https://img.icons8.com/ios-filled/20/00A300/checkmark--v1.png');
    });

    it('should render discredited button marked', () => {
      preloadedState.userAcc.authenticatedUser.accreditedArticles = [];
      preloadedState.userAcc.authenticatedUser.discreditedArticles = [1];
      renderComponent(ArticleCard, { expectedProps, preloadedState, needsStore, needsMemoryRouter });

      expect(
        screen.getByAltText(/discredit button/i).src
      ).toBe('https://img.icons8.com/fluency-systems-filled/20/DD3939/x.png');
    });
    
  })
  

})
