import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getInitialState, testStore } from '../../../../utils/testing';
import { MemoryRouter } from 'react-router';
import ArticleCard from './ArticleCard';
import userEvent from '@testing-library/user-event';

const mockHistoryPush = jest.fn();
const initialState = getInitialState();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const renderComponent = (props = {}, preloadedState = null) => {
  render(
    <Provider store={testStore(preloadedState)}>
      <MemoryRouter>
        <ArticleCard {...props} />
      </MemoryRouter>
    </Provider>
  )
}

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
      renderComponent(expectedProps);
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
      renderComponent(expectedProps, preloadedState);

      expect(
        screen.getByAltText(/accredit button/i).src
      ).toBe('https://img.icons8.com/ios-filled/20/00A300/checkmark--v1.png');
    });

    it('should render discredited button marked', () => {
      preloadedState.userAcc.authenticatedUser.accreditedArticles = [];
      preloadedState.userAcc.authenticatedUser.discreditedArticles = [1];
      renderComponent(expectedProps, preloadedState); 

      expect(
        screen.getByAltText(/discredit button/i).src
      ).toBe('https://img.icons8.com/fluency-systems-filled/20/DD3939/x.png');
    });
    
  })
  

})
