import { renderComponent } from '../../../../utils/testing'
import UserProfile from './UserProfile'

const mockHistoryPush = jest.fn()
jest.mock('react-router', () => ({
  ...jest.requireActual(),
  useHistory: () => ({ push: mockHistoryPush }),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({ id: 2 }),
}))

describe('UserProfile', () => {
  const options = {
    needsStore: true,
    needsMemoryRouter: true,
  }

  it('should render without any errors', () => {
    const { getByTestId } = renderComponent(UserProfile, options)
    expect(getByTestId('user-profile-component')).toBeInTheDocument()
  })
})
