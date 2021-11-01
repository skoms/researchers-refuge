import {
  getInitialState,
  getMockUsers,
  renderComponent,
} from '../../../utils/testing'
import { waitFor } from '@testing-library/react'
import UserProfileFeed from './userProfileFeed/UserProfileFeed'
import MyProfileFeed from './myProfileFeed/MyProfileFeed'
import userEvent from '@testing-library/user-event'

const mockHistoryPush = jest.fn()
jest.mock('react-router', () => ({
  ...jest.requireActual(),
  useHistory: () => ({ push: mockHistoryPush }),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({ id: 2 }),
}))

const initialState = getInitialState()
const options = {
  needsStore: true,
  needsMemoryRouter: true,
  expectedProps: {
    id: 10,
  },
  preloadedState: {
    ...initialState,
    userAcc: {
      loggedIn: true,
      authenticatedUser: getMockUsers(),
    },
  },
}

describe('UserFeed', () => {
  describe('UserProfileFeed', () => {
    it('should render without any errors', async () => {
      const { getByRole } = renderComponent(UserProfileFeed, options)
      await waitFor(() => {
        expect(
          getByRole('heading', { name: /test10 user10/i }),
        ).toBeInTheDocument()
      })
    })

    it('should render with correct profile and header img', async () => {
      const { getByAltText } = renderComponent(UserProfileFeed, options)
      await waitFor(() => {
        expect([
          getByAltText(/header/i).src,
          getByAltText(/profile-pic/i).src,
        ]).toStrictEqual([
          getMockUsers().headerImgURL,
          getMockUsers().profileImgURL,
        ])
      })
    })

    it('should render with the "follow" button', async () => {
      const { getByRole } = renderComponent(UserProfileFeed, options)
      await waitFor(() => {
        expect(getByRole('button', { name: /follow/i })).toBeInTheDocument()
      })
    })

    it('should successfully unfollow the user', async () => {
      const { store, getByRole } = renderComponent(UserProfileFeed, options)

      await waitFor(() => {
        expect(getByRole('button', { name: /follow/i })).toBeInTheDocument()
      })

      userEvent.click(getByRole('button', { name: /follow/i }))

      await waitFor(() => {
        expect(
          store.getState().userAcc.authenticatedUser.following,
        ).toStrictEqual([...getMockUsers().following, 10])
      })
    })

    it('should render with the "Report User" button', async () => {
      const { getByRole } = renderComponent(UserProfileFeed, options)
      await waitFor(() => {
        expect(
          getByRole('button', { name: /report user/i }),
        ).toBeInTheDocument()
      })
    })

    it('should render user stats', async () => {
      const { getByText } = renderComponent(UserProfileFeed, options)
      await waitFor(() => {
        expect(getByText(/^testing10$/i)).toBeInTheDocument()
        expect(getByText(/^articles:$/i)).toBeInTheDocument()
        expect(getByText(/^credits:$/i)).toBeInTheDocument()
        expect(getByText(/^followers:$/i)).toBeInTheDocument()
        expect(getByText(/^following:$/i)).toBeInTheDocument()
      })
    })

    it('should render with the default 5 articles published', async () => {
      const { getAllByRole } = renderComponent(UserProfileFeed, options)
      await waitFor(() => {
        expect(getAllByRole('heading', { name: /test title\d/i })).toHaveLength(
          5,
        )
      })
    })

    it('should render "no articles" message for article recently accredited', async () => {
      const { getByText } = renderComponent(UserProfileFeed, options)
      await waitFor(() => {
        expect(
          getByText(
            /Sorry, but we don't seem to have what you are looking for/i,
          ),
        ).toBeInTheDocument()
      })
    })
  })

  describe('MyProfileFeed', () => {
    it('should render without any errors', async () => {
      const { getByRole } = renderComponent(MyProfileFeed, options)
      await waitFor(() => {
        expect(
          getByRole('heading', { name: /test1 user1/i }),
        ).toBeInTheDocument()
      })
    })

    it('should render with correct profile and header img', async () => {
      const { getByAltText } = renderComponent(MyProfileFeed, options)
      await waitFor(() => {
        expect([
          getByAltText(/header/i).src,
          getByAltText(/profile-pic/i).src,
        ]).toStrictEqual([
          getMockUsers().headerImgURL,
          getMockUsers().profileImgURL,
        ])
      })
    })

    it('should render with the "edit profile" button', async () => {
      const { getByRole } = renderComponent(MyProfileFeed, options)
      await waitFor(() => {
        expect(
          getByRole('button', { name: /edit profile/i }),
        ).toBeInTheDocument()
      })
    })

    it('should render user stats', async () => {
      const { getByText } = renderComponent(MyProfileFeed, options)
      await waitFor(() => {
        expect(getByText(/^testing1$/i)).toBeInTheDocument()
        expect(getByText(/^articles:$/i)).toBeInTheDocument()
        expect(getByText(/^credits:$/i)).toBeInTheDocument()
        expect(getByText(/^followers:$/i)).toBeInTheDocument()
        expect(getByText(/^following:$/i)).toBeInTheDocument()
      })
    })

    it('should render with the default 5 articles published', async () => {
      const { getAllByRole } = renderComponent(MyProfileFeed, options)
      await waitFor(() => {
        expect(getAllByRole('heading', { name: /test title\d/i })).toHaveLength(
          5,
        )
      })
    })

    it('should render "no articles" message for article recently accredited', async () => {
      const { getByText } = renderComponent(MyProfileFeed, options)
      await waitFor(() => {
        expect(
          getByText(
            /Sorry, but we don't seem to have what you are looking for/i,
          ),
        ).toBeInTheDocument()
      })
    })
  })
})
