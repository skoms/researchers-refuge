import { screen } from '@testing-library/react'
import { getInitialState, renderComponent } from '../../utils/testing'
import AdminPanel from './AdminPanel'

const mockHistoryPush = jest.fn()

jest.mock('react-router', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const initialState = getInitialState()
const needsStore = true
const needsMemoryRouter = true

describe('AdminPanel', () => {
  it('should render without errors', () => {
    renderComponent(AdminPanel, { needsStore, needsMemoryRouter })
    expect(screen.getByTestId('admin-panel-component')).toBeInTheDocument()
  })

  describe('Accessed through small screen devices (but logged in)', () => {
    const preloadedState = {
      ...initialState,
      userAcc: {
        ...initialState.userAcc,
        authenticatedUser: {
          id: 1,
          firstName: 'test',
          lastName: 'user',
          accessLevel: 'admin',
        },
      },
      screenWidth: {
        width: 600,
        isMobile: true,
      },
    }

    beforeEach(() => {
      renderComponent(AdminPanel, {
        preloadedState,
        needsStore,
        needsMemoryRouter,
      })
    })

    it('should not render the actual content, but rather warning content', () => {
      expect(screen.getByText(/admin panel not available/i)).toBeInTheDocument()
    })
  })

  describe('When not logged in as admin', () => {
    const preloadedState = {
      ...initialState,
      userAcc: {
        ...initialState.userAcc,
        authenticatedUser: {
          id: 1,
          firstName: 'test',
          lastName: 'user',
          accessLevel: 'none',
        },
      },
      screenWidth: {
        width: 1200,
        isMobile: false,
      },
    }

    beforeEach(() => {
      renderComponent(AdminPanel, {
        preloadedState,
        needsStore,
        needsMemoryRouter,
      })
    })

    it('should call mockHistoryPush with /forbidden', () => {
      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: '/forbidden',
        state: { from: '/' },
      })
    })
  })

  describe('When not logged in', () => {
    const preloadedState = {
      ...initialState,
      userAcc: {
        loggedIn: false,
        authenticatedUser: null,
      },
      screenWidth: {
        width: 1200,
        isMobile: false,
      },
    }

    beforeEach(() => {
      renderComponent(AdminPanel, {
        preloadedState,
        needsStore,
        needsMemoryRouter,
      })
    })

    it('should call mockHistoryPush with /forbidden', () => {
      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: '/forbidden',
        state: { from: '/' },
      })
    })
  })

  describe('Logged in as "admin" and bigger screen', () => {
    const preloadedState = {
      ...initialState,
      userAcc: {
        ...initialState.userAcc,
        authenticatedUser: {
          id: 1,
          firstName: 'test',
          lastName: 'user',
          accessLevel: 'admin',
        },
      },
      screenWidth: {
        width: 1200,
        isMobile: false,
      },
    }

    beforeEach(() => {
      renderComponent(AdminPanel, {
        preloadedState,
        needsStore,
        needsMemoryRouter,
      })
    })

    it('should render without errors', () => {
      expect(screen.getByTestId('admin-panel-component')).toBeInTheDocument()
    })

    it('should render the actual content, and not warning content', () => {
      expect(screen.getByText(/^admin panel$/i)).toBeInTheDocument()
    })

    it('should initially open at "statistics"', () => {
      expect(
        screen.getByRole('heading', { name: /statistics/i }),
      ).toBeInTheDocument()
    })
  })
})
