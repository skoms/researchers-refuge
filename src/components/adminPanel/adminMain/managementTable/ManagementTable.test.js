import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ManagementTable from './ManagementTable';
import { testStore } from '../../../../utils/testing';
import { Provider } from 'react-redux';

let store;

const renderComponent = (props = {}) => {
  render(
    <Provider store={store}>
      <ManagementTable {...props} />
    </Provider>
  );
}

describe('ManagementTable', () => {
  let mockSetManagerProps;
  
  beforeEach(() => {
    store = testStore();
    mockSetManagerProps = jest.fn();
    const expectedProps = {
      setManagerProps: mockSetManagerProps,
      isActive: true,
      statusFilter: 'open',
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
        entries: [
          {
            id: 1,
            firstName: 'test fname1',
            lastName: 'test lname1',
            emailAddress: 'test email1',
            accessLevel: 'none',
            createdAt: 'some time',
            updatedAt: 'some time',
            blocked: false
          },
          {
            id: 2,
            firstName: 'test fname2',
            lastName: 'test lname2',
            emailAddress: 'test email2',
            accessLevel: 'none',
            createdAt: 'some time',
            updatedAt: 'some time',
            blocked: false
          },
          {
            id: 3,
            firstName: 'test fname3',
            lastName: 'test lname3',
            emailAddress: 'test email3',
            accessLevel: 'none',
            createdAt: 'some time',
            updatedAt: 'some time',
            blocked: false
          },
          {
            id: 4,
            firstName: 'test fname4',
            lastName: 'test lname4',
            emailAddress: 'test email4',
            accessLevel: 'none',
            createdAt: 'some time',
            updatedAt: 'some time',
            blocked: false
          },
          {
            id: 5,
            firstName: 'test fname5',
            lastName: 'test lname5',
            emailAddress: 'test email5',
            accessLevel: 'none',
            createdAt: 'some time',
            updatedAt: 'some time',
            blocked: false
          },
        ],
      },
      type: 'users'
    }
    renderComponent(expectedProps);
  });

  it('should render without any errors', () => {
    expect(
      screen.getByRole('table')
    ).toBeInTheDocument();
  });

  it('should render all the tableheaders', () => {
    expect(
      screen.getAllByRole('columnheader').length
    ).toBe(8);
  });

  it('should render blocked icon instead of "blocked" for blocked column', () => {
    expect(
      screen.getByAltText(/blocked icon/i)
    ).toBeVisible();
  });

  it('should render the entries given in props', () => {
    expect(
      screen.getAllByRole('cell', { name: /test fname\d/i }).length
    ).toBe(5);
  });

  it('should render all the inputs for the required columns', () => {
    expect(
      screen.getAllByPlaceholderText(/(first name)|(last name)|(e-mail)|(access level)/i).length
    ).toBe(4);
  });

  it('should should get the class of the statusFilter (Only used for "Report Center")', () => {
    expect(
      screen.getByRole('table')
    ).toHaveClass('open');
  });

  it('should update the newData in the store when getting user input', () => {
    const expectedOutput = {
      firstName: 'test fname',
      lastName: 'test lname',
      emailAddress: 'test email',
      accessLevel: 'admin'
    }

    userEvent.type(screen.getByPlaceholderText(/first name/i), expectedOutput.firstName);
    userEvent.type(screen.getByPlaceholderText(/last name/i), expectedOutput.lastName);
    userEvent.type(screen.getByPlaceholderText(/e-mail/i), expectedOutput.emailAddress);
    userEvent.type(screen.getByPlaceholderText(/access level/i), expectedOutput.accessLevel);

    expect(
      store.getState().adminPanel.users.newData
    ).toStrictEqual(expectedOutput);
  });

})
