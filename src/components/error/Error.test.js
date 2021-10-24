import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '../../utils/testing';
import Forbidden from './forbidden/Forbidden';
import NotFound from './notFound/NotFound';
import UnhandledError from './unhandledError/UnhandledError';

const mockHistoryPush = jest.fn();
const needsMemoryRouter = true;

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => ({ pathname: '/error' }),
  useHistory: () => ({ push: mockHistoryPush }),
}));

describe('Forbidden', () => {
  
  beforeEach(() => {
    act(() => { renderComponent(Forbidden, { needsMemoryRouter }) })
  });

  it('should render without any errors', () => {
    expect(
      screen.getByAltText(/stop-sign/i)
    ).toBeInTheDocument();
  });

  it('should render with status code 403', () => {
    expect(
      screen.getByRole('heading', { name: /403/i })
    ).toBeInTheDocument();
  });

  it('should render with an errors message', () => {
    expect(
      screen.getByText(/you do not have/i)
    ).toBeInTheDocument();
  });

  it('should render with a button to go back', () => {
    expect(
      screen.getByRole('button', { name: /go back/i })
    ).toBeInTheDocument();
  });

  it('should call mockHistoryPush when clicking the button', () => {
    userEvent.click(screen.getByRole('button'));
    expect(
      mockHistoryPush
    ).toHaveBeenLastCalledWith({ pathname: '/' });
  });
})

describe('NotFound', () => {
  
  beforeEach(() => {
    act(() => { renderComponent(NotFound, { needsMemoryRouter }) })
  });

  it('should render without any errors', () => {
    expect(
      screen.getByAltText(/stop-sign/i)
    ).toBeInTheDocument();
  });

  it('should render with status code 404', () => {
    expect(
      screen.getByRole('heading', { name: /404/i })
    ).toBeInTheDocument();
  });

  it('should render with an errors message', () => {
    expect(
      screen.getByText(/we could not find/i)
    ).toBeInTheDocument();
  });

  it('should render with a link to the homepage', () => {
    expect(
      screen.getByRole('link', { name: /homepage/i })
    ).toBeInTheDocument();
  });

  it('should render with a button to go back', () => {
    expect(
      screen.getByRole('button', { name: /go back/i })
    ).toBeInTheDocument();
  });

  it('should call mockHistoryPush when clicking the button', () => {
    userEvent.click(screen.getByRole('button'));
    expect(
      mockHistoryPush
    ).toHaveBeenLastCalledWith({ pathname: '/' });
  });
});

describe('UnhandledError', () => {

  describe('without props', () => {
    let store;
    beforeEach(() => {
      act(() => { 
        store = renderComponent(UnhandledError, { needsMemoryRouter, needsStore: true }).store
      })
    });

    it('should render without any errors', () => {
      expect(
        screen.getByAltText(/stop-sign/i)
      ).toBeInTheDocument();
    });

    it('should render with status code 500', () => {
      expect(
        screen.getByRole('heading', { name: /500/i })
      ).toBeInTheDocument();
    });

    it('should render with an errors message', () => {
      expect(
        screen.getByText(/Something went wrong/i)
      ).toBeInTheDocument();
    });

    it('should render with a span for issuing reports', () => {
      expect(
        screen.getByText(/issue a bug report/i)
      ).toBeInTheDocument();
    });

    it('should open report module when clicking "issue a bug report"', () => {
      userEvent.click(screen.getByText(/issue a bug report/i));
      expect(
        store.getState().reportModule.isActive
      ).toBe(true);
    });

    it('should render with a button to go back', () => {
      expect(
        screen.getByRole('button', { name: /go back/i })
      ).toBeInTheDocument();
    });

    it('should call mockHistoryPush when clicking the button', () => {
      userEvent.click(screen.getByRole('button'));
      expect(
        mockHistoryPush
      ).toHaveBeenLastCalledWith({ pathname: '/' });
    });
  })

  describe('with props', () => {
    let store;
    const expectedProps = {
      statusCode: 505,
      errorMessage: 'test error message',
      errorStack: 'test error stack' 
    }
    beforeEach(() => {
      act(() => { 
        store = renderComponent(UnhandledError, { needsMemoryRouter, expectedProps, needsStore: true }).store
      })
    });

    it('should render without any errors', () => {
      expect(
        screen.getByAltText(/stop-sign/i)
      ).toBeInTheDocument();
    });

    it('should render with status code 505', () => {
      expect(
        screen.getByRole('heading', { name: expectedProps.statusCode })
      ).toBeInTheDocument();
    });

    it('should render with an errors message', () => {
      expect(
        screen.getByText(expectedProps.errorMessage)
      ).toBeInTheDocument();
    });

    it('should render with an error stack', () => {
      expect(
        screen.getByText(expectedProps.errorStack)
      ).toBeInTheDocument();
    });

    it('should render with a span for issuing reports', () => {
      expect(
        screen.getByText(/issue a bug report/i)
      ).toBeInTheDocument();
    });

    it('should open report module when clicking "issue a bug report"', () => {
      userEvent.click(screen.getByText(/issue a bug report/i));
      expect(
        store.getState().reportModule.isActive
      ).toBe(true);
    });

    it('should render with a button to go back', () => {
      expect(
        screen.getByRole('button', { name: /go back/i })
      ).toBeInTheDocument();
    });

    it('should call mockHistoryPush when clicking the button', () => {
      userEvent.click(screen.getByRole('button'));
      expect(
        mockHistoryPush
      ).toHaveBeenLastCalledWith({ pathname: '/' });
    });
  })
  
});

