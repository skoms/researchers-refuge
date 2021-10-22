import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActionButtons from './ActionButtons';
import { renderComponent } from '../../../../utils/testing';

const needsStore = true;

describe('ActionButtons', () => {
  
  describe('Entry Row ActionButtons (with dropdown menu)', () => {
    
    beforeEach(() => {
      const expectedProps = {
        id: 1,
        isEntry: true,
        statusFilter: 'open',
        setManagerProps: jest.fn(),
        data: {
  
        },
        type: 'users'
      }
      renderComponent(ActionButtons, { expectedProps, needsStore});
    });

    it('should render without any errors', () => {
      expect(
        screen.getByTestId('action-buttons-component')
      ).toBeInTheDocument();
    });

    it('should show tooltip on button hover', () => {
      userEvent.hover(screen.getByAltText(/view button/i))
      expect(
        screen.getByText(/^view$/i)
      ).toBeVisible();
    });

    it('should render "more" menu button', () => {
      expect(
        screen.getByAltText('more button')
      ).toBeInTheDocument();
    });

    it('should open "more" menu on click', () => {
      const moreButton = screen.getByAltText('more button');
      userEvent.click(moreButton);
      expect(
        screen.getByTestId('more-menu-dropdown')
      ).toBeVisible();
    });

    it('should not close "more" menu when clicking the menu itself', () => {
      userEvent.click(screen.getByAltText('more button'));
      userEvent.click(screen.getByTestId('more-menu-dropdown'));
      expect(
        screen.getByTestId('more-menu-dropdown')
      ).toBeVisible();
    });

    it('should close "more" menu when clicking somewhere else', () => {
      userEvent.click(screen.getByAltText('more button'));
      userEvent.click(screen.getByTestId('action-buttons-component'));
      expect(
        screen.getByTestId('more-menu-dropdown').parentElement
      ).not.toHaveClass('active');
    });

  });

  describe('Entry Row ActionButtons (without dropdown menu)', () => {
    
    beforeEach(() => {
      const expectedProps = {
        id: 1,
        isEntry: true,
        statusFilter: 'open',
        setManagerProps: jest.fn(),
        data: {
  
        },
        type: 'topics'
      }
      renderComponent(ActionButtons, {expectedProps, needsStore});
    });

    it('should render without any errors', () => {
      expect(
        screen.getByTestId('action-buttons-component')
      ).toBeInTheDocument();
    });

    it('should not render "more" menu button', () => {
      expect(
        screen.queryByAltText('more button')
      ).toBeNull();
    });

    it('should render delete button in-place of more button', () => {
      expect(
        screen.getByAltText('delete button')
      ).toBeVisible();
    });

  });

  describe('Non-Entry Row ActionButtons', () => {

    beforeEach(() => {
      const expectedProps = {
        id: 1,
        isEntry: false,
        statusFilter: 'open',
        setManagerProps: jest.fn(),
        data: {
  
        },
        type: 'reports'
      }
      renderComponent(ActionButtons, {expectedProps, needsStore});
    });

    it('should render the "create" button', () => {
      expect(
        screen.getByAltText('create button')
      ).toBeInTheDocument();
    });

    it('should not render the view and edit buttons', () => {
      expect(
        screen.queryAllByAltText(/(view)|(edit) button/i)
      ).toStrictEqual([]);
    });

    it('should not render the marker buttons', () => {
      expect(
        screen.queryAllByAltText(/mark as/i)
      ).toStrictEqual([]);
    });
    
  });
  

  describe('Report Center: Entry Row ActionButtons', () => {
    
    describe('with StatusFilter: "open"', () => {

      beforeEach(() => {
        const expectedProps = {
          id: 1,
          isEntry: true,
          statusFilter: 'open',
          setManagerProps: jest.fn(),
          data: {
    
          },
          type: 'reports'
        }
        renderComponent(ActionButtons, {expectedProps, needsStore});
      });
  
      it('should render without any errors', () => {
        expect(
          screen.getByTestId('action-buttons-component')
        ).toBeInTheDocument();
      });
  
      it('should not render "more" menu button', () => {
        expect(
          screen.queryByAltText('more button')
        ).toBeNull();
      });
  
      it('should render delete button in-place of more button', () => {
        expect(
          screen.getByAltText('delete button')
        ).toBeVisible();
      });
  
      it('should render all the marker buttons', () => {
        expect(
          screen.getAllByAltText(/mark as/i).length
        ).toBe(3);
      });
  
      it('should disable the button for the selected "open" StatusFilter', () => {
        expect(
          screen.getByAltText(/mark as open/i).parentElement
        ).toHaveClass('disabled');
      });

      it('should show tooltip on marker button hover', () => {
        userEvent.hover(screen.getByAltText(/mark as rejected/i))
        expect(
          screen.getByText(/mark as 'rejected'/i)
        ).toBeVisible();
      });

    });

    describe('with StatusFilter: "resolved"', () => {

      beforeEach(() => {
        const expectedProps = {
          id: 1,
          isEntry: true,
          statusFilter: 'resolved',
          setManagerProps: jest.fn(),
          data: {
    
          },
          type: 'reports'
        }
        renderComponent(ActionButtons, {expectedProps, needsStore});
      });
  
      it('should disable the button for the selected "resolved" StatusFilter', () => {
        expect(
          screen.getByAltText(/mark as resolved/i).parentElement
        ).toHaveClass('disabled');
      });
      
    });

    describe('with StatusFilter: "rejected"', () => {

      beforeEach(() => {
        const expectedProps = {
          id: 1,
          isEntry: true,
          statusFilter: 'rejected',
          setManagerProps: jest.fn(),
          data: {
    
          },
          type: 'reports'
        }
        renderComponent(ActionButtons, {expectedProps, needsStore});
      });
  
      it('should disable the button for the selected "rejected" StatusFilter', () => {
        expect(
          screen.getByAltText(/mark as rejected/i).parentElement
        ).toHaveClass('disabled');
      });
      
    });
    

  });
  

})


