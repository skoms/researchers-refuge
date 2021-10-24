import { cleanup, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import ArticleForm from './ArticleForm';
import { getInitialState, renderComponent } from '../../../utils/testing';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({ id: 1 }),
}));


const initialState = getInitialState();
const needsStore = true;
const needsMemoryRouter = true;
const mockArticleInfo = {
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
}

describe('ArticleForm', () => {

  describe('general', () => {
    const expectedProps = {
      isUpdate: false
    }

    const preloadedState = {
      ...initialState
    }

    afterAll(() => {
      cleanup();
      jest.restoreAllMocks();
    });
  
    beforeEach(() => {
      act(() => {
        renderComponent(
          ArticleForm, 
          { expectedProps, preloadedState, needsStore, needsMemoryRouter }
        );
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
    const expectedProps = {
      isUpdate: false
    }

    const preloadedState = {
      ...initialState
    }

    afterAll(() => {
      cleanup();
      jest.restoreAllMocks();
    });
  
    beforeEach(() => {
      
      act(() => {
        renderComponent(
          ArticleForm, 
          { expectedProps, preloadedState, needsStore, needsMemoryRouter }
        );
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
    const expectedProps = {
      isUpdate: true
    }
    
    const preloadedState = {
      ...initialState,
      userAcc: {
        loggedIn: true,
        authenticatedUser: {
          id: 1,
          firstName: 'test',
          lastName: 'user',
        }
      }
    }

    afterAll(() => {
      cleanup();
      jest.restoreAllMocks();
    });
  
    beforeEach( async () => {
      await axios.mockResolvedValueOnce({ 
        status: 200, 
        data: mockArticleInfo
      });
      
      await act( async () => {
        await renderComponent(
          ArticleForm, 
          { expectedProps, preloadedState, needsStore, needsMemoryRouter }
        );
      });
    });

    it('should render without any errors', () => {
      expect(
        screen.getByTestId('article-form-component')
      ).toBeInTheDocument();
    });

    it('should render with data', async () => {
      await waitFor(() => {
        expect(
          screen.getByLabelText(/title/i)
        ).toHaveValue(mockArticleInfo.title);
        expect(
          screen.getByLabelText(/intro/i)
        ).toHaveValue(mockArticleInfo.intro);
        expect(
          screen.getByLabelText(/body/i)
        ).toHaveValue(mockArticleInfo.body);
        expect(
          screen.getByLabelText(/tags/i)
        ).toHaveValue(mockArticleInfo.tags.join(','));
      });
    });

  });
  
});
