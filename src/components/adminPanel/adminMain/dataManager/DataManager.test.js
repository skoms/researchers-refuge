import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '../../../../utils/testing';
import DataManager from './DataManager';
import moxios from 'moxios';

const needsStore = true;

describe('DataManager', () => {
  
  describe('where source: Create', () => {
    let mockSetManagerProps;
    
    beforeEach(() => {
      mockSetManagerProps = jest.fn();
      const expectedProps = {
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
            { column: 'blocked', name: 'Blocked', input: false }
          ],
          requiredColumns: [
            { column: 'firstName', name: 'First Name', needsTextArea: false },
            { column: 'lastName', name: 'Last Name', needsTextArea: false },
            { column: 'emailAddress', name: 'E-mail', needsTextArea: false },
            { column: 'accessLevel', name: 'Access Level', needsTextArea: false },
            { column: 'password', name: 'Password', needsTextArea: false },
          ],
          entries: [],
          newData: {},
          total: 0,
          rangeStart: 0,
          rangeEnd: 0
        },
        type: 'users'
      }
      renderComponent(DataManager, { expectedProps, needsStore });
    });

    afterEach(() => {
      mockSetManagerProps.mockReset();
    });

    it('should render without any errors', () => {
      expect(
        screen.getByTestId('data-manager-component')
      ).toBeInTheDocument();
    });

    it('should render all 5 inputs with label', () => {
      expect(
        screen.getAllByLabelText(/(first)|(last)|(e-mail)|(access)|(password)/i).length
      ).toBe(5);
    });

    it('should close the data manager after create', () => {
      const expectedState = {
        entry: {
          firstName: 'test fname',
          lastName: 'test lname',
          emailAddress: 'test email',
          blocked: false,
          updatedAt: 'test time',
          createdAt: 'test time',
        }
      }
      moxios.install();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: expectedState
        })
      });

      userEvent.click(screen.getByRole('button', { name: /create/i }))

      return expect(
        mockSetManagerProps // This function is whats used to hide DataManager
      ).toHaveBeenCalledTimes(1);
    });

    it('should close the data manager when the close button is clicked', () => {
      userEvent.click(screen.getByRole('button', { name: /cancel/i }))
      return expect(
        mockSetManagerProps // This function is whats used to hide DataManager
      ).toHaveBeenCalledTimes(1);
    });

  });

  describe('where source: View', () => {
    let mockSetManagerProps;
    
    beforeEach(() => {
      mockSetManagerProps = jest.fn();
      const expectedProps = {
        setManagerProps: mockSetManagerProps,
        isActive: true,
        source: 'view',
        data: {
          firstName: 'test fname',
          lastName: 'test lname',
          emailAddress: 'test email',
          blocked: false
        },
        type: 'users'
      }
      renderComponent(DataManager, { expectedProps, needsStore });
    });

    afterEach(() => {
      mockSetManagerProps.mockReset();
    });

    it('should render without any errors', () => {
      expect(
        screen.getByTestId('data-manager-component')
      ).toBeInTheDocument();
    });

    it('should render all headers passed in', () => {
      expect(
        screen.getAllByRole( 'cell', /(firstName)|(lastName)|(emailAddress)|(blocked)/i).length
      ).toBe(4);
    });

    it('should render all data cells passed in', () => {
      expect(
        screen.getAllByRole( 'cell', /(test fname)|(test lname)|(test email)|(false)/i).length
      ).toBe(4);
    });

    it('should close the data manager when the close button is clicked', () => {
      userEvent.click(screen.getByRole('button', { name: /close/i }))
      return expect(
        mockSetManagerProps // This function is whats used to hide DataManager
      ).toHaveBeenCalledTimes(1);
    });

  });

  describe('where source: Edit', () => {
    let mockSetManagerProps;
    
    beforeEach(() => {
      mockSetManagerProps = jest.fn();
      const expectedProps = {
        setManagerProps: mockSetManagerProps,
        isActive: true,
        source: 'edit',
        data: {
          firstName: 'test fname',
          lastName: 'test lname',
          emailAddress: 'test email',
          blocked: false
        },
        type: 'users'
      }
      renderComponent(DataManager, { expectedProps, needsStore });
    });

    afterEach(() => {
      mockSetManagerProps.mockReset();
    });

    it('should render without any errors', () => {
      expect(
        screen.getByTestId('data-manager-component')
      ).toBeInTheDocument();
    });

    it('should render all labels passed in through data', () => {
      expect(
        screen.getAllByLabelText(/(firstName)|(lastName)|(emailAddress)|(blocked)/i).length
      ).toBe(4);
    });

    it('should render all data in the inputs from the data', () => {
      expect(
        screen.getAllByRole( 'textbox', { target: { value: /(test fname)|(test lname)|(test email)|(false)/i } }).length
      ).toBe(4);
    });

    it('should close the data manager after edit', () => {
      const expectedState = {
        entry: {
          firstName: 'test fname',
          lastName: 'test lname',
          emailAddress: 'test email',
          blocked: false,
          updatedAt: 'test time',
          createdAt: 'test time',
        }
      }
      moxios.install();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: expectedState
        })
      });

      userEvent.click(screen.getByRole('button', { name: /edit/i }))

      return expect(
        mockSetManagerProps // This function is whats used to hide DataManager
      ).toHaveBeenCalledTimes(1);
    });

    it('should close the data manager when the close button is clicked', () => {
      userEvent.click(screen.getByRole('button', { name: /cancel/i }))
      return expect(
        mockSetManagerProps // This function is whats used to hide DataManager
      ).toHaveBeenCalledTimes(1);
    });

  });
  

})
