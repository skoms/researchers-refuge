import {
  getInitialState,
  getMockUsers,
  renderComponent,
} from '../../../../utils/testing'
import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditProfile from './EditProfile'
import { server } from '../../../../mocks/server'
import { rest } from 'msw'

const mockHistoryPush = jest.fn()
jest.mock('react-router', () => ({
  ...jest.requireActual(),
  useHistory: () => ({ push: mockHistoryPush }),
}))

const initialState = getInitialState()
const mockUser = getMockUsers()
const mockToggleEdit = jest.fn()

const options = {
  needsStore: true,
  needsMemoryRouter: true,
  expectedProps: { toggleEdit: mockToggleEdit },
  preloadedState: {
    ...initialState,
    userAcc: {
      loggedIn: true,
      authenticatedUser: mockUser,
    },
  },
}

describe('EditProfile', () => {
  describe('General / Profile', () => {
    afterEach(() => {
      jest.restoreAllMocks()
      options.expectedProps.toggleEdit = mockToggleEdit
    })

    it('should render without any errors', () => {
      const { getByRole } = renderComponent(EditProfile, options)
      expect(getByRole('heading', { name: /edit/i })).toBeInTheDocument()
    })

    it('should render with the profile form initially', () => {
      const { getByRole } = renderComponent(EditProfile, options)
      expect(getByRole('heading', { name: /profile/i })).toBeInTheDocument()
    })

    it('should render with the users data already filled in', () => {
      const { getByLabelText } = renderComponent(EditProfile, options)
      expect(getByLabelText(/first name/i)).toHaveDisplayValue(
        mockUser.firstName,
      )
      expect(getByLabelText(/last name/i)).toHaveDisplayValue(mockUser.lastName)
      expect(getByLabelText(/occupation/i)).toHaveDisplayValue(
        mockUser.occupation,
      )
      expect(getByLabelText(/bio/i)).toHaveDisplayValue(mockUser.bio)
    })

    it('should update the inputs on user input', () => {
      const { getByLabelText, getAllByDisplayValue } = renderComponent(
        EditProfile,
        options,
      )
      userEvent.type(getByLabelText(/first name/i), 'test')
      userEvent.type(getByLabelText(/last name/i), 'test')
      userEvent.type(getByLabelText(/occupation/i), 'test')
      userEvent.type(getByLabelText(/bio/i), 'test')

      expect(getAllByDisplayValue(/test$/i)).toHaveLength(4)
    })

    it('should successfully update any of the fields that were changed', async () => {
      const { store, getByLabelText, getByRole } = renderComponent(
        EditProfile,
        options,
      )
      userEvent.clear(getByLabelText(/first name/i))
      userEvent.type(getByLabelText(/first name/i), 'test')
      userEvent.clear(getByLabelText(/last name/i))
      userEvent.type(getByLabelText(/last name/i), 'test')
      userEvent.click(getByRole('button', { name: /update/i }))
      await waitFor(() => {
        expect(mockToggleEdit).toHaveBeenCalledTimes(1)
        expect(store.getState().userAcc.authenticatedUser.firstName).toBe(
          'test',
        )
        expect(store.getState().userAcc.authenticatedUser.lastName).toBe('test')
      })
    })

    it('should forward user to /forbidden if error code is not 500', async () => {
      server.use(rest.put('*', (req, res, ctx) => res(ctx.status(401))))
      const { getByLabelText, getByRole } = renderComponent(
        EditProfile,
        options,
      )
      userEvent.clear(getByLabelText(/first name/i))
      userEvent.type(getByLabelText(/first name/i), 'test')
      userEvent.clear(getByLabelText(/last name/i))
      userEvent.type(getByLabelText(/last name/i), 'test')
      userEvent.click(getByRole('button', { name: /update/i }))
      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith('/forbidden')
      })
    })

    it('should forward user to /error if error code is 500', async () => {
      server.use(rest.put('*', (req, res, ctx) => res(ctx.status(500))))
      const { getByLabelText, getByRole } = renderComponent(
        EditProfile,
        options,
      )
      userEvent.clear(getByLabelText(/first name/i))
      userEvent.type(getByLabelText(/first name/i), 'test')
      userEvent.clear(getByLabelText(/last name/i))
      userEvent.type(getByLabelText(/last name/i), 'test')
      userEvent.click(getByRole('button', { name: /update/i }))
      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith('/error')
      })
    })

    it('should toggle off the edit popup on "cancel" click', () => {
      const { getByRole } = renderComponent(EditProfile, options)
      userEvent.click(getByRole('button', { name: /cancel/i }))
      expect(mockToggleEdit).toHaveBeenCalledTimes(1)
    })

    it('should toggle off the edit popup on "X" click', () => {
      const { getByAltText } = renderComponent(EditProfile, options)
      userEvent.click(getByAltText(/exit button/i))
      expect(mockToggleEdit).toHaveBeenCalledTimes(1)
    })

    it('should switch to other form on sidebar "Account" click', () => {
      const { getByRole } = renderComponent(EditProfile, options)
      userEvent.click(getByRole('button', { name: /account/i }))
      expect(getByRole('heading', { name: /account/i })).toBeInTheDocument()
    })
  })

  describe('Account', () => {
    it('should render with the users data already filled in', () => {
      const { getByLabelText, getByRole } = renderComponent(
        EditProfile,
        options,
      )
      userEvent.click(getByRole('button', { name: /account/i }))
      expect(getByLabelText(/email/i)).toHaveDisplayValue(mockUser.emailAddress)
    })

    it('should update the fields on render update', () => {
      const { getByLabelText, getByRole } = renderComponent(
        EditProfile,
        options,
      )
      userEvent.click(getByRole('button', { name: /account/i }))

      userEvent.clear(getByLabelText(/current password/i))
      userEvent.type(getByLabelText(/current password/i), 'testCurPass')

      userEvent.clear(getByLabelText(/email/i))
      userEvent.type(getByLabelText(/email/i), 'testEmail')

      userEvent.clear(getByLabelText(/new password/i))
      userEvent.type(getByLabelText(/new password/i), 'testNewPass')

      userEvent.clear(getByLabelText(/confirm password/i))
      userEvent.type(getByLabelText(/confirm password/i), 'testConPass')

      expect([
        getByLabelText(/current password/i).value,
        getByLabelText(/email/i).value,
        getByLabelText(/new password/i).value,
        getByLabelText(/confirm password/i).value,
      ]).toStrictEqual([
        'testCurPass',
        'testEmail',
        'testNewPass',
        'testConPass',
      ])
    })

    it('should update the info on correct current password', async () => {
      const { store, getByLabelText, getByRole } = renderComponent(
        EditProfile,
        options,
      )
      userEvent.click(getByRole('button', { name: /account/i }))

      userEvent.type(getByLabelText(/current password/i), mockUser.password)

      userEvent.clear(getByLabelText(/email/i))
      userEvent.type(getByLabelText(/email/i), 'newTest@Email.com')

      userEvent.click(getByRole('button', { name: /update/i }))

      await waitFor(() => {
        expect(mockToggleEdit).toHaveBeenCalledTimes(1)
        expect(store.getState().userAcc.authenticatedUser.emailAddress).toBe(
          'newTest@Email.com',
        )
      })
    })

    it('should not update the info on wrong current password', async () => {
      const { store, getByLabelText, getByRole } = renderComponent(
        EditProfile,
        options,
      )
      userEvent.click(getByRole('button', { name: /account/i }))

      userEvent.type(
        getByLabelText(/current password/i),
        mockUser.password + 'wrong',
      )

      userEvent.clear(getByLabelText(/email/i))
      userEvent.type(getByLabelText(/email/i), 'newTest@Email.com')

      userEvent.click(getByRole('button', { name: /update/i }))

      await waitFor(() => {
        expect(getByLabelText(/current password/i).parentElement).toHaveClass(
          'mismatch',
        )
        expect(mockToggleEdit).toHaveBeenCalledTimes(0)
        expect(store.getState().userAcc.authenticatedUser.emailAddress).toBe(
          mockUser.emailAddress,
        )
      })
    })
  })
})
