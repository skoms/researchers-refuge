import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getInitialState, renderComponent } from '../../utils/testing'
import PaginationBar from './PaginationBar'

window.scroll = jest.fn()
const initialState = getInitialState()
let options = {
  needsStore: true,
  expectedProps: {
    use: 'admin',
  },
  preloadedState: {
    ...initialState,
    paginationBar: {
      ...initialState.paginationBar,
      hasMore: true,
      page: 1,
      lastPage: 3,
    },
  },
}

describe('PaginationBar', () => {
  beforeEach(() => {
    options = {
      needsStore: true,
      expectedProps: {
        use: 'admin',
      },
      preloadedState: {
        ...initialState,
        paginationBar: {
          ...initialState.paginationBar,
          hasMore: true,
          page: 1,
          lastPage: 3,
        },
      },
    }
  })

  it('should render without any errors', () => {
    const { getByTestId } = renderComponent(PaginationBar, options)
    expect(getByTestId('pagination-bar-component')).toBeInTheDocument()
  })

  it('should not render if theres no more than 1 page of content', () => {
    options.preloadedState.paginationBar = {
      lastPage: 1,
      page: 1,
      hasMore: false,
    }
    renderComponent(PaginationBar, options)
    expect(screen.queryByTestId('pagination-bar-component')).toBeNull()
  })

  it('should render initially current page set to 1', () => {
    const { getByRole } = renderComponent(PaginationBar, options)
    expect(getByRole('button', { name: /1/i })).toHaveClass('currentPage')
  })

  it('should not render buttons "first", "prev", and "0" when on page 1', () => {
    const { queryAllByRole } = renderComponent(PaginationBar, options)
    expect(
      queryAllByRole('button', { name: /(first)|(prev)|(0)/i }),
    ).toHaveLength(0)
  })

  it('should not render buttons "4", "next", and "last" when on the last page(3)', () => {
    options.preloadedState.paginationBar = {
      lastPage: 3,
      page: 3,
      hasMore: false,
    }
    const { queryAllByRole } = renderComponent(PaginationBar, options)
    expect(
      queryAllByRole('button', { name: /(next)|(last)|(4)/i }),
    ).toHaveLength(0)
  })

  it('should update the current page on "next" button click', () => {
    const { store, getByRole } = renderComponent(PaginationBar, options)
    userEvent.click(getByRole('button', { name: /next/i }))
    expect(getByRole('button', { name: /2/i })).toHaveClass('currentPage')
    expect(store.getState().paginationBar.page).toBe(2)
  })

  it('should update the current page on "prev" button click', () => {
    options.preloadedState.paginationBar = {
      lastPage: 4,
      page: 3,
      hasMore: false,
    }
    const { store, getByRole } = renderComponent(PaginationBar, options)
    userEvent.click(getByRole('button', { name: /prev/i }))
    expect(getByRole('button', { name: /2/i })).toHaveClass('currentPage')
    expect(store.getState().paginationBar.page).toBe(2)
  })

  it('should take you back to page 1 on click "first"', () => {
    options.preloadedState.paginationBar = {
      lastPage: 4,
      page: 4,
      hasMore: false,
    }
    const { store, getByRole } = renderComponent(PaginationBar, options)
    userEvent.click(getByRole('button', { name: /first/i }))
    expect(getByRole('button', { name: /1/i })).toHaveClass('currentPage')
    expect(store.getState().paginationBar.page).toBe(1)
  })

  it('should take you to page 4 on click "last"', () => {
    options.preloadedState.paginationBar = {
      lastPage: 4,
      page: 1,
      hasMore: true,
    }
    const { store, getByRole } = renderComponent(PaginationBar, options)
    userEvent.click(getByRole('button', { name: /last/i }))
    expect(getByRole('button', { name: /4/i })).toHaveClass('currentPage')
    expect(store.getState().paginationBar.page).toBe(4)
  })

  it('should take you to the page you click on', () => {
    options.preloadedState.paginationBar = {
      lastPage: 4,
      page: 2,
      hasMore: true,
    }
    const { store, getByRole } = renderComponent(PaginationBar, options)
    userEvent.click(getByRole('button', { name: /1/i }))
    expect(getByRole('button', { name: /1/i })).toHaveClass('currentPage')
    expect(store.getState().paginationBar.page).toBe(1)
  })
})
