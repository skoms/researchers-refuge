import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ArticleForm from './ArticleForm';
import { getInitialState, getMockArticles, getMockUsers, renderComponent } from '../../../utils/testing';
import userEvent from '@testing-library/user-event';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => ({ pathname: '/update-article/1' }),
  useParams: () => ({ id: 1 }),
}))


const initialState = getInitialState();
const mockArticleInfo = getMockArticles();

describe('ArticleForm', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  })

  describe('general', () => {
    const options = {
      needsStore: true,
      needsMemoryRouter: true,
      expectedProps: {
        isUpdate: false
      },
      preloadedState: {
        ...initialState
      }
    }
  
    beforeEach(() => {
      act(() => {
        renderComponent( ArticleForm, options );
      });
    });

    it('should render without any errors', () => {
      expect(
        screen.getByTestId('article-form-component')
      ).toBeInTheDocument();
    });

    it('should render 4 textboxes', () => {
      expect(
        screen.getAllByRole('textbox')
      ).toHaveLength(4);
    });
    
    it('should render topic select', () => {
      expect(
        screen.getByRole('combobox')
      ).toBeInTheDocument();
    });

    it('should render date input', () => {
      expect(
        screen.getByTestId('date-input')
      ).toBeInTheDocument();
    });

    it('should update "title" when user input', () => {
      userEvent.type(
        screen.getByLabelText(/title/i),
        'test title1'
      );
      expect(
        screen.getByLabelText(/title/i)
      ).toHaveValue('test title1');
    });

    it('should update "intro" when user input', () => {
      userEvent.type(
        screen.getByLabelText(/intro/i),
        'test intro1'
      );
      expect(
        screen.getByLabelText(/intro/i)
      ).toHaveValue('test intro1');
    });

    it('should update "body" when user input', () => {
      userEvent.type(
        screen.getByLabelText(/body/i),
        'test body1'
      );
      expect(
        screen.getByLabelText(/body/i)
      ).toHaveValue('test body1');
    });

    it('should update "tags" when user input', () => {
      userEvent.type(
        screen.getByLabelText(/tags/i),
        'test tags1'
      );
      expect(
        screen.getByLabelText(/tags/i)
      ).toHaveValue('test tags1');
    });

    it('should toggle "invalid" class on unfilled inputs and prevent submit', () => {
      userEvent.type(
        screen.getByLabelText(/intro/i),
        'test intro'
      );
      userEvent.type(
        screen.getByLabelText(/body/i),
        'test body'
      );
      userEvent.type(
        screen.getByLabelText(/tags/i),
        'test tags,test tags'
      );
      userEvent.click( screen.getByRole('button', { name: /create/i }) );
      
      expect(
        screen.getByLabelText(/title/i).parentElement
      ).toHaveClass('invalid');
    });

  });

  describe(':CREATE:', () => {
    const options = {
      needsStore: true,
      needsMemoryRouter: true,
      expectedProps: {
        isUpdate: false
      },
      preloadedState: {
        ...initialState
      }
    }
  
    beforeEach(() => {
      
      act(() => {
        renderComponent( ArticleForm, options );
      });
    });

    it('should render without any errors', () => {
      expect(
        screen.getByTestId('article-form-component')
      ).toBeInTheDocument();
    });

    it('should not initiate with any data', () => {
      expect(
        screen.getByLabelText(/title/i)
      ).toHaveValue('');

      expect(
        screen.getByLabelText(/intro/i)
      ).toHaveValue('');

      expect(
        screen.getByLabelText(/body/i)
      ).toHaveValue('');

      expect(
        screen.getByLabelText(/published/i)
      ).toHaveValue('');

      expect(
        screen.getByLabelText(/topic/i)
      ).toHaveValue('none');

      expect(
        screen.getByLabelText(/tags/i)
      ).toHaveValue('');
    });

    it('should render title "CREATE ARTICLE"', () => {
      expect(
        screen.getByRole('heading', { name: /create article/i })
      ).toBeInTheDocument();
    });

    it('should render button "create"', () => {
      expect(
        screen.getByRole('button', { name: /create/i })
      ).toBeInTheDocument();
    });

  });
  
  describe(':UPDATE:', () => {
    const options = {
      needsStore: true,
      needsMemoryRouter: true,
      expectedProps: {
        isUpdate: true
      },
      preloadedState: {
        ...initialState,
        userAcc: {
          loggedIn: true,
          authenticatedUser: getMockUsers({ id: 1 })
        }
      }
    }

    it('should render without any errors', () => {
      act(() => {
        renderComponent( ArticleForm, options );
      });
      expect(
        screen.getByTestId('article-form-component')
      ).toBeInTheDocument();
    });

    it('should render with data', async () => {
      const { 
        store, findByDisplayValue, findAllByDisplayValue 
      } = await renderComponent( ArticleForm, options );

      expect( await findAllByDisplayValue('') ).toHaveLength(5);

      await waitFor(() => {
        expect(
          store.getState().manageArticle.article
        ).toStrictEqual( mockArticleInfo );
      });
      
      expect( await findByDisplayValue(mockArticleInfo.title) ).toBeInTheDocument();
      expect( await findByDisplayValue(mockArticleInfo.intro) ).toBeInTheDocument();
      expect( await findByDisplayValue(mockArticleInfo.body) ).toBeInTheDocument();
      expect( await findByDisplayValue(mockArticleInfo.tags.join(',')) ).toBeInTheDocument();
    });
  });
  
});
