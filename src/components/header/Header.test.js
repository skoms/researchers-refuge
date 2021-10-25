import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { renderComponent } from '../../utils/testing';
import { updateAccount } from '../user/userAccManage/userAccSlice';
import Header from './Header';

jest.mock('axios')

const needsStore = true;
const needsMemoryRouter = true;
const mockCategories = [
  {
    id: 1,
    name: 'test category 1',
    Topics: [
      {
        id: 1,
        name: 'test topic 1'
      },
      {
        id: 2,
        name: 'test topic 2'
      },
      {
        id: 3,
        name: 'test topic 3'
      }
    ]
  },
  {
    id: 2,
    name: 'test category 2',
    Topics: [
      {
        id: 1,
        name: 'test topic 1'
      },
      {
        id: 2,
        name: 'test topic 2'
      },
      {
        id: 3,
        name: 'test topic 3'
      }
    ]
  },
  {
    id: 3,
    name: 'test category 3',
    Topics: [
      {
        id: 1,
        name: 'test topic 1'
      },
      {
        id: 2,
        name: 'test topic 2'
      },
      {
        id: 3,
        name: 'test topic 3'
      }
    ]
  },
  
];

describe('Header', () => {
  
  describe('general/not logged in', () => {
    beforeEach( async () => {
      axios.mockResolvedValueOnce({
        status: 200,
        data: mockCategories
      })
  
      await act( async () => {
        await renderComponent(Header, { needsStore, needsMemoryRouter });
      });
    });
  
    it('should render without any errors', () => {
      expect(
        screen.getByTestId('header-component')
      ).toBeInTheDocument();
    });
  
    it('should render logo and name', () => {
      expect(
        screen.getByAltText(/logo/i) && 
        screen.getByRole('heading', { name: /researchers/i })
      ).toBeTruthy();
    });
  
    it('should render the search field', () => {
      expect(
        screen.getByPlaceholderText(/search for articles/i)
      ).toBeInTheDocument();
    });
  
    it('should render and populate the topic select', () => {
      expect(
        screen.getAllByRole('option', { name: /test topic/i })
      ).toHaveLength(9);
    });
  
    it('should render the darkmode button', () => {
      expect(
        screen.getByAltText(/darkmode button/i)
      ).toBeInTheDocument();
    });

    it('should render sign buttons', () => {
      expect(
        screen.getAllByRole('button', { name: /sign (in)|(up)/i })
      ).toHaveLength(2);
    });

    it('should not render the menu button', () => {
      expect(
        screen.queryByAltText(/menu toggle button/i)
      ).toBeNull();
    });
  
    it('should not render the profile picture', () => {
      expect(
        screen.queryByAltText(/your profile/i)
      ).toBeNull();
    });
  })
  

  describe('when logged in (non-admin)', () => {
    let store;

    beforeEach( async () => {
      axios.mockResolvedValueOnce({
        status: 200,
        data: mockCategories
      })
  
      await act( async () => {
        store = await renderComponent(Header, { needsStore, needsMemoryRouter }).store;
      });

      await store.dispatch(updateAccount({
        id: 1,
        firstName: 'test',
        lastName: 'user',
        accessLevel: 'none'
      }));
    });

    it('should render the menu button', () => {
      expect(
        screen.getByAltText(/menu toggle button/i)
      ).toBeInTheDocument();
    });

    it('should not initially show menu dropdown', () => {
      expect(
        screen.getByTestId('header-dropdown-menu')
      ).toHaveClass('invisible');
    });
  
    it('should open the menu on click', () => {
      userEvent.click(screen.getByAltText(/menu toggle button/i));
      expect(
        screen.getByTestId('header-dropdown-menu')
      ).not.toHaveClass('invisible');
    });

    it('should not render the menu option: Admin Panel', () => {
      expect(
        screen.queryByRole('link', { name: /admin panel/i })
      ).toBeNull();
    });
  
    it('should render the profile picture', () => {
      expect(
        screen.getByAltText(/your profile/i)
      ).toBeInTheDocument();
    });

    it('should not render sign buttons', () => {
      expect(
        screen.queryAllByRole('button', { name: /sign (in)|(up)/i })
      ).toHaveLength(0);
    });

    it('should log you out when "Sign Out" is pressed', () => {
      userEvent.click(screen.getByRole('button', { name: /sign out/i }));
      expect(
        store.getState().userAcc.authenticatedUser
      ).toBeNull();
    });

    it('should open the report menu when "Report Bug" is pressed', () => {
      userEvent.click(screen.getByRole('button', { name: /report bug/i }));
      expect(
        store.getState().reportModule.isActive
      ).toBe(true);
    });
  })

  describe('when logged in (admin)', () => {
    let store;

    beforeEach( async () => {
      axios.mockResolvedValueOnce({
        status: 200,
        data: mockCategories
      })
  
      await act( async () => {
        store = await renderComponent(Header, { needsStore, needsMemoryRouter }).store;
      });

      await store.dispatch(updateAccount({
        id: 1,
        firstName: 'test',
        lastName: 'user',
        accessLevel: 'admin'
      }));
    });

    it('should render additional menu option: Admin Panel', () => {
      expect(
        screen.getByRole('link', { name: /admin panel/i })
      ).toBeInTheDocument();
    });
  });
});