import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { getInitialState, renderComponent } from '../../utils/testing';
import ReportModule from './ReportModule';

jest.mock('axios');

const initialState = getInitialState();
const options = {
  needsStore: true,
  preloadedState: {
    ...initialState,
    userAcc: {
      authenticatedUser: {
        id: 10,
        firstName: 'test',
        lastName: 'user'
      }
    },
    reportModule: {
      isActive: true,
      errors: [],
      targetId: 3,
      type: 'User'
    }
  }
}

describe('ReportModule', () => {
  
  describe('General / Type: User', () => {
    let store;
    beforeEach( async () => {
      options.preloadedState = {
        ...initialState,
        userAcc: {
          authenticatedUser: {
            id: 10,
            firstName: 'test',
            lastName: 'user'
          }
        },
        reportModule: {
          isActive: true,
          errors: [],
          targetId: 3,
          type: 'User'
        }
      }

      await axios.mockResolvedValueOnce({ status: 204 });

      act(() => { 
        store = renderComponent(ReportModule, options).store 
      });
    });

    it('should render without any errors', () => {
      expect(
        screen.getByRole('heading', { name: /report user/i })
      ).toBeInTheDocument();
    });

    it('should render select and display the correct menu options', () => {
      expect(
        screen.getByRole('combobox')
      ).toBeInTheDocument();
      expect(
        screen.getAllByRole('option', { 
          name: /(offensive)|(inappropriate)|(spam)|(fake name)|(impersonation)|(other)/i
        })
      ).toHaveLength(6)
    });

    it('should select the option clicked', () => {
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        'spam'
      );
      expect(
        screen.getByRole('combobox').value
      ).toBe('spam');
    });

    it('should update textarea while typing in input', () => {
      userEvent.type(
        screen.getByRole('textbox'),
        'test text'
      );
      expect(
        screen.getByRole('textbox').value 
      ).toBe('test text');
    });

    it('should not submit, and show errors when trying to submit without required data', () => {
      userEvent.click(screen.getByRole('button', { name: /submit report/i }));
      expect(
        screen.getAllByRole('listitem')
      ).toHaveLength(2);
    });
    
    it('should not submit, and show error when trying to submit without both required data', () => {
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        'spam'
      );
      userEvent.click(screen.getByRole('button', { name: /submit report/i }));
      expect(
        screen.getAllByRole('listitem')
      ).toHaveLength(1);
    });

    it('should toggle isActive and reset errors when pressing "cancel"', () => {
      userEvent.click(screen.getByRole('button', { name: /submit report/i }));
      userEvent.click(screen.getByRole('button', { name: /cancel/i }));
      expect([
        store.getState().reportModule.isActive,
        store.getState().reportModule.errors
      ]).toStrictEqual([false, []]);
    });

    it('should toggle isActive and reset errors when submit successful', async () => {
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        'spam'
      );
      userEvent.type(
        screen.getByRole('textbox'),
        'test text'
      );
      userEvent.click(screen.getByRole('button', { name: /submit report/i }));
      await waitFor(() => {
        expect([
          store.getState().reportModule.isActive,
          store.getState().reportModule.errors
        ]).toStrictEqual([false, []]);
      })
    });
    
  })

  describe('Type: Article', () => {
    beforeEach(() => {
      options.preloadedState = {
        ...initialState,
        userAcc: {
          authenticatedUser: {
            id: 10,
            firstName: 'test',
            lastName: 'user'
          }
        },
        reportModule: {
          isActive: true,
          errors: [],
          targetId: 2,
          type: 'Article'
        }
      }

      act(() => { renderComponent(ReportModule, options) });
    });

    it('should render without any errors', () => {
      expect(
        screen.getByRole('heading', { name: /report article/i })
      ).toBeInTheDocument();
    });

    it('should render select and display the correct menu options', () => {
      expect(
        screen.getByRole('combobox')
      ).toBeInTheDocument();
      expect(
        screen.getAllByRole('option', { 
          name: /(offensive)|(inappropriate)|(fraudulent)|(stolen)|(propaganda)|(incomplete)|(other)/i
        })
      ).toHaveLength(7)
    });

  })

  describe('Type: Bug', () => {
    beforeEach(() => {
      options.preloadedState = {
        ...initialState,
        userAcc: {
          authenticatedUser: {
            id: 10,
            firstName: 'test',
            lastName: 'user'
          }
        },
        reportModule: {
          isActive: true,
          errors: [],
          targetId: null,
          type: 'Bug'
        }
      }

      act(() => { renderComponent(ReportModule, options) });
    });

    it('should render without any errors', () => {
      expect(
        screen.getByRole('heading', { name: /report bug/i })
      ).toBeInTheDocument();
    });

    it('should render select and display the correct menu options', () => {
      expect(
        screen.getByRole('combobox')
      ).toBeInTheDocument();
      expect(
        screen.getAllByRole('option', { 
          name: /(unexpected)|(visual)|(feature)|(account)|(other)/i
        })
      ).toHaveLength(5)
    });
    
  })

})


