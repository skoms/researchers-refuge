import {
  getInitialState,
  getMockUsers,
  renderComponent,
} from '../../../../utils/testing'
import { waitFor } from '@testing-library/react'
import MyProfile from './MyProfile'

const mockHistoryPush = jest.fn()
jest.mock('react-router', () => ({
  ...jest.requireActual(),
  useHistory: () => ({ push: mockHistoryPush }),
  useLocation: () => ({ pathname: '/' }),
}))

const initialState = getInitialState()

describe('MyProfile', () => {
  describe('Not on Mobile', () => {
    const options = {
      needsStore: true,
      needsMemoryRouter: true,
      preloadedState: {
        ...initialState,
        userAcc: {
          loggedIn: true,
          authenticatedUser: getMockUsers(),
        },
        screenWidth: {
          width: 1500,
          isMobile: false,
        },
      },
    }

    it('should render without any errors', () => {
      const { getByTestId } = renderComponent(MyProfile, options)
      expect(getByTestId('my-profile-component')).toBeInTheDocument()
    })

    it('should render RecPeople', async () => {
      const { getByRole } = renderComponent(MyProfile, options)
      await waitFor(() => {
        expect(
          getByRole('heading', { name: /people you may know/i }),
        ).toBeInTheDocument()
      })
    })
  })
  describe('On Mobile', () => {
    const options = {
      needsStore: true,
      needsMemoryRouter: true,
      preloadedState: {
        ...initialState,
        userAcc: {
          loggedIn: true,
          authenticatedUser: getMockUsers(),
        },
        screenWidth: {
          width: 500,
          isMobile: true,
        },
      },
    }
    it('should not render RecPeople', async () => {
      const { queryByRole } = renderComponent(MyProfile, options)
      await waitFor(() => {
        expect(
          queryByRole('heading', { name: /people you may know/i }),
        ).not.toBeInTheDocument()
      })
    })
  })
})
