import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  getInitialState,
  getMockUsers,
  renderComponent,
} from '../../utils/testing'
import ResultRecUser from './ResultRecUser'

const mockHistoryPush = jest.fn()

jest.mock('react-router', () => ({
  useHistory: () => ({ push: mockHistoryPush }),
  useLocation: () => ({ pathname: '/' }),
}))

const mockUser = getMockUsers()
mockUser.following.push(10)

const initialState = getInitialState()
let options

describe('ResultRecUser', () => {
  beforeAll(() => {
    options = {
      needsStore: true,
      needsMemoryRouter: true,
      expectedProps: {
        user: {
          id: 10,
          firstName: 'test',
          lastName: 'user',
          occupation: 'tester',
          profileImgURL:
            'https://img.icons8.com/ios-glyphs/60/FFFFFF/user--v1.png',
          followers: [1, 2, 3],
        },
      },
      preloadedState: {
        ...initialState,
        userAcc: {
          authenticatedUser: {
            ...mockUser,
            id: 1,
            following: [1, 2, 3, 4, 5],
          },
        },
      },
    }
  })

  describe('general/not followed', () => {
    it('should render without any errors', () => {
      const { container } = renderComponent(ResultRecUser, options)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render with the correct data passed from props', () => {
      const { getByRole, getAllByText } = renderComponent(
        ResultRecUser,
        options,
      )
      expect(getByRole('img').src).toBe(
        'https://img.icons8.com/ios-glyphs/60/FFFFFF/user--v1.png',
      )
      expect(getAllByText(/(test user)|(tester)/i)).toHaveLength(2)
    })

    it('should call mockHistoryPush with directions when click "view"', () => {
      const { getByRole } = renderComponent(ResultRecUser, options)
      userEvent.click(getByRole('button', { name: /view/i }))
      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: '/users/10',
        state: { from: '/' },
      })
    })

    it('should update the store when following someone', async () => {
      const { store, getByRole, findByRole } = await renderComponent(
        ResultRecUser,
        options,
      )
      userEvent.click(getByRole('button', { name: /follow/i }))
      await waitFor(async () => {
        expect(
          await findByRole('button', { name: /unfollow/i }),
        ).toBeInTheDocument()
        expect(store.getState().userAcc.authenticatedUser).toStrictEqual(
          mockUser,
        )
      })
    })
  })

  describe('Following', () => {
    it('should render the "Unfollow" button', () => {
      options.expectedProps.user.followers.push(5)
      const { getByRole } = renderComponent(ResultRecUser, options)
      expect(getByRole('button', { name: /unfollow/i })).toBeInTheDocument()
    })
  })
})
