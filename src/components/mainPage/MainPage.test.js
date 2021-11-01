import { screen, act } from '@testing-library/react'
import { getInitialState, renderComponent } from '../../utils/testing'
import MainPage from './MainPage'

const needsStore = true
const initialState = getInitialState()

describe('MainPage', () => {
  describe('when logged in not on mobile', () => {
    const preloadedState = {
      ...initialState,
      userAcc: {
        loggedIn: true,
        authenticatedUser: {
          firstName: 'test',
          lastName: 'user',
          occupation: 'tester',
          bio: 'test bio',
          accessLevel: 'none',
        },
      },
    }

    beforeEach(() => {
      act(() => {
        renderComponent(MainPage, { needsStore, preloadedState })
      })
    })

    it('should render without any errors', () => {
      expect(screen.getByTestId('main-page-component')).toBeInTheDocument()
    })

    it('should render InfoModule', () => {
      expect(screen.getByText(/test user/i)).toBeInTheDocument()
    })

    it('should render Recommend Module', () => {
      expect(
        screen.getByTestId('recommend-module-component'),
      ).toBeInTheDocument()
    })

    it('should render Feed', () => {
      expect(screen.getByTestId('feed-component')).toBeInTheDocument()
    })
  })

  describe('logged in, on mobile', () => {
    const preloadedState = {
      ...initialState,
      userAcc: {
        loggedIn: true,
        authenticatedUser: {
          firstName: 'test',
          lastName: 'user',
          occupation: 'tester',
          bio: 'test bio',
          accessLevel: 'none',
        },
      },
      screenWidth: {
        width: 600,
        isMobile: true,
      },
    }

    beforeEach(() => {
      act(() => {
        renderComponent(MainPage, { needsStore, preloadedState })
      })
    })

    it('should render without any errors', () => {
      expect(screen.getByTestId('main-page-component')).toBeInTheDocument()
    })

    it('should not render InfoModule', () => {
      expect(screen.queryByText(/test user/i)).toBeNull()
    })

    it('should not render Recommend Module', () => {
      expect(screen.queryByTestId('recommend-module-component')).toBeNull()
    })

    it('should render Feed', () => {
      expect(screen.getByTestId('feed-component')).toBeInTheDocument()
    })
  })

  describe('not logged in', () => {
    beforeEach(() => {
      act(() => {
        renderComponent(MainPage, { needsStore })
      })
    })

    it('should render without any errors', () => {
      expect(screen.getByTestId('main-page-component')).toBeInTheDocument()
    })

    it('should not render InfoModule', () => {
      expect(screen.queryByText(/test user/i)).toBeNull()
    })

    it('should not render Recommend Module', () => {
      expect(screen.queryByTestId('recommend-module-component')).toBeNull()
    })

    it('should render Feed', () => {
      expect(screen.getByTestId('feed-component')).toBeInTheDocument()
    })
  })
})
