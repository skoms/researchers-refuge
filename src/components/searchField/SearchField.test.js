import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getInitialState, renderComponent } from '../../utils/testing'
import SearchField from './SearchField'

const mockHistoryPush = jest.fn()

jest.mock('react-router', () => ({
  useLocation: () => ({ pathname: '/' }),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const initialState = getInitialState()

describe('SearchField', () => {
  describe('not on mobile', () => {
    let store
    const options = {
      needsStore: true,
      needsMemoryRouter: true,
      preloadedState: {
        ...initialState,
        screenWidth: {
          ...initialState.screenWidth,
          isMobile: false,
        },
      },
    }

    beforeEach(() => {
      act(() => {
        store = renderComponent(SearchField, options).store
      })
    })

    afterAll(() => {
      jest.resetAllMocks()
    })

    it('should render without any errors', () => {
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('should render a magnifying glass for the submit button', () => {
      expect(screen.getByAltText(/search button/i)).toBeInTheDocument()
    })

    it('should update the searchTerm state onchange', () => {
      userEvent.type(screen.getByRole('textbox'), 'test text')
      expect(store.getState().searchField.searchTerm).toBe('test text')
    })

    it('should call the mockHistoryPush with data', () => {
      userEvent.type(screen.getByRole('textbox'), 'test text')
      userEvent.click(screen.getByRole('button'))
      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: '/search/test text',
        state: { from: '/' },
      })
    })
  })

  describe('On mobile', () => {
    let store
    const options = {
      needsStore: true,
      needsMemoryRouter: true,
      preloadedState: {
        ...initialState,
        screenWidth: {
          ...initialState.screenWidth,
          isMobile: true,
        },
      },
    }

    beforeEach(() => {
      act(() => {
        store = renderComponent(SearchField, options).store
      })
    })

    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('should render without any errors', () => {
      expect(screen.getByAltText(/^toggle search button$/i)).toBeInTheDocument()
    })

    it('should not display searchField initially', () => {
      expect(
        screen.getByRole('textbox').parentElement.parentElement,
      ).toHaveClass('invisible')
    })

    it('should toggle open searchField on button click', () => {
      userEvent.click(screen.getByAltText(/^toggle search button$/i))
      expect(
        screen.getByRole('textbox').parentElement.parentElement,
      ).not.toHaveClass('invisible')
    })

    it('should update the searchTerm state onchange', () => {
      userEvent.type(screen.getByRole('textbox'), 'test text')
      expect(store.getState().searchField.searchTerm).toBe('test text')
    })

    it('should call the mockHistoryPush with data and hide mobile search bar', () => {
      userEvent.type(screen.getByRole('textbox'), 'test text')
      userEvent.click(screen.getByAltText(/^search button$/i))
      expect(mockHistoryPush).toHaveBeenCalledWith({
        pathname: '/search/test text',
        state: { from: '/' },
      })
      expect(
        screen.getByRole('textbox').parentElement.parentElement,
      ).toHaveClass('invisible')
    })
  })
})
