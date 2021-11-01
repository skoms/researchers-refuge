import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderComponent } from '../../../../utils/testing'
import DataManager from './DataManager'

describe('DataManager', () => {
  describe('where source: Create', () => {
    const options = {
      expectedProps: {},
      needsStore: true,
    }
    let mockSetManagerProps

    beforeEach(async () => {
      mockSetManagerProps = jest.fn()
      options.expectedProps = {
        setManagerProps: mockSetManagerProps,
        isActive: true,
        source: 'create',
        data: {
          type: 'users',
          columns: [
            { column: 'firstName', name: 'First Name', input: true },
            { column: 'lastName', name: 'Last Name', input: true },
            { column: 'emailAddress', name: 'E-mail', input: true },
            { column: 'accessLevel', name: 'Access Level', input: true },
            { column: 'createdAt', name: 'Created', input: false },
            { column: 'updatedAt', name: 'Last Updated', input: false },
            { column: 'blocked', name: 'Blocked', input: false },
          ],
          requiredColumns: [
            { column: 'firstName', name: 'First Name', needsTextArea: false },
            { column: 'lastName', name: 'Last Name', needsTextArea: false },
            { column: 'emailAddress', name: 'E-mail', needsTextArea: false },
            {
              column: 'accessLevel',
              name: 'Access Level',
              needsTextArea: false,
            },
            { column: 'password', name: 'Password', needsTextArea: false },
          ],
          entries: [],
          newData: {},
          total: 0,
          rangeStart: 0,
          rangeEnd: 0,
        },
        type: 'users',
      }
    })

    afterEach(() => {
      mockSetManagerProps.mockReset()
    })

    it('should render without any errors', () => {
      renderComponent(DataManager, options)
      expect(screen.getByTestId('data-manager-component')).toBeInTheDocument()
    })

    it('should render all 5 inputs with label', () => {
      renderComponent(DataManager, options)
      expect(
        screen.getAllByLabelText(/(first)|(last)|(e-mail)|(access)|(password)/i)
          .length,
      ).toBe(5)
    })

    it('should update the inputs with new data', () => {
      renderComponent(DataManager, options)
      userEvent.type(screen.getByLabelText(/first name/i), 'test text')
      expect(screen.getByLabelText(/first name/i)).toHaveValue('test text')
    })

    it('should close the data manager after create (regardless of success)', async () => {
      renderComponent(DataManager, options)
      userEvent.click(screen.getByRole('button', { name: /create/i }))

      await waitFor(() =>
        expect(
          mockSetManagerProps, // This function is whats used to hide DataManager
        ).toHaveBeenCalledTimes(1),
      )
    })

    it('should close after submit request', async () => {
      renderComponent(DataManager, options)
      userEvent.type(screen.getByLabelText(/first name/i), 'test1')
      userEvent.type(screen.getByLabelText(/last name/i), 'user1')
      userEvent.type(screen.getByLabelText(/e-mail/i), 'test1@user1.com')
      userEvent.type(screen.getByLabelText(/access/i), 'none')
      userEvent.type(screen.getByLabelText(/password/i), 'testUser123')

      expect(screen.getByLabelText(/e-mail/i)).toHaveValue('test1@user1.com')

      userEvent.click(screen.getByRole('button', { name: /create/i }))

      await waitFor(() => {
        expect(
          mockSetManagerProps, // This function is whats used to hide DataManager
        ).toHaveBeenCalledTimes(1)
      })
    })

    it('should close the data manager when the close button is clicked', () => {
      renderComponent(DataManager, options)
      userEvent.click(screen.getByRole('button', { name: /cancel/i }))
      return expect(
        mockSetManagerProps, // This function is whats used to hide DataManager
      ).toHaveBeenCalledTimes(1)
    })
  })

  describe('where source: View', () => {
    let mockSetManagerProps
    const options = {
      expectedProps: {},
      needsStore: true,
    }

    beforeEach(() => {
      mockSetManagerProps = jest.fn()
      options.expectedProps = {
        setManagerProps: mockSetManagerProps,
        isActive: true,
        source: 'view',
        data: {
          firstName: 'test fname',
          lastName: 'test lname',
          emailAddress: 'test email',
          blocked: false,
        },
        type: 'users',
      }
      renderComponent(DataManager, options)
    })

    afterEach(() => {
      mockSetManagerProps.mockReset()
    })

    it('should render without any errors', () => {
      expect(screen.getByTestId('data-manager-component')).toBeInTheDocument()
    })

    it('should render all headers passed in', () => {
      expect(
        screen.getAllByRole(
          'cell',
          /(firstName)|(lastName)|(emailAddress)|(blocked)/i,
        ).length,
      ).toBe(4)
    })

    it('should render all data cells passed in', () => {
      expect(
        screen.getAllByRole(
          'cell',
          /(test fname)|(test lname)|(test email)|(false)/i,
        ).length,
      ).toBe(4)
    })

    it('should close the data manager when the close button is clicked', () => {
      userEvent.click(screen.getByRole('button', { name: /close/i }))
      return expect(
        mockSetManagerProps, // This function is whats used to hide DataManager
      ).toHaveBeenCalledTimes(1)
    })
  })

  describe('where source: Edit', () => {
    let mockSetManagerProps
    const options = {
      expectedProps: {},
      needsStore: true,
    }

    beforeEach(() => {
      mockSetManagerProps = jest.fn()
      options.expectedProps = {
        setManagerProps: mockSetManagerProps,
        isActive: true,
        source: 'edit',
        data: {
          firstName: 'test fname',
          lastName: 'test lname',
          emailAddress: 'test email',
          blocked: false,
        },
        type: 'users',
      }
      renderComponent(DataManager, options)
    })

    afterEach(() => {
      mockSetManagerProps.mockReset()
    })

    it('should render without any errors', () => {
      expect(screen.getByTestId('data-manager-component')).toBeInTheDocument()
    })

    it('should render all labels passed in through data', () => {
      expect(
        screen.getAllByLabelText(
          /(firstName)|(lastName)|(emailAddress)|(blocked)/i,
        ).length,
      ).toBe(4)
    })

    it('should render all data in the inputs from the data', () => {
      expect(
        screen.getAllByRole('textbox', {
          target: { value: /(test fname)|(test lname)|(test email)|(false)/i },
        }).length,
      ).toBe(4)
    })

    it('should close the data manager after edit', async () => {
      userEvent.click(screen.getByRole('button', { name: /edit/i }))

      await waitFor(() =>
        expect(
          mockSetManagerProps, // This function is whats used to hide DataManager
        ).toHaveBeenCalledTimes(1),
      )
    })

    it('should close the data manager when the close button is clicked', () => {
      userEvent.click(screen.getByRole('button', { name: /cancel/i }))
      return expect(
        mockSetManagerProps, // This function is whats used to hide DataManager
      ).toHaveBeenCalledTimes(1)
    })
  })
})
