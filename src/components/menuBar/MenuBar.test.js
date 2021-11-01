import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { getInitialState, renderComponent } from '../../utils/testing'
import MenuBar from './MenuBar'

const needsStore = true
const initialState = getInitialState()

describe('MenuBar', () => {
  describe('general', () => {
    let store
    beforeEach(() => {
      act(() => {
        store = renderComponent(MenuBar, { needsStore }).store
      })
    })

    it('should render without any errors', () => {
      expect(screen.getByTestId('menubar-component')).toBeInTheDocument()
    })

    it('should render all 4 filter buttons and 1 "New Article" button', () => {
      expect(
        screen.getAllByRole('button', {
          name: /(popular)|(new)|(top)|(following)$/i,
        }),
      ).toHaveLength(5)
    })

    it('should render with "Popular" selected', () => {
      expect(screen.getByRole('button', { name: /popular/i })).toHaveClass(
        'selected',
      )
    })

    it('should deselect previously chosen and select chosen on selecting new filter', () => {
      expect(screen.getByRole('button', { name: /popular/i })).toHaveClass(
        'selected',
      )
      userEvent.click(screen.getByRole('button', { name: /top/i }))
      expect(screen.getByRole('button', { name: /top/i })).toHaveClass(
        'selected',
      )
      expect(screen.getByRole('button', { name: /popular/i })).not.toHaveClass(
        'selected',
      )
    })

    it('should update store filter and page states', () => {
      userEvent.click(screen.getByRole('button', { name: /top/i }))
      expect([
        store.getState().feed.filter,
        store.getState().paginationBar.page,
      ]).toStrictEqual(['top', 1])
    })

    it('should render "new article" button and not icon', () => {
      expect(screen.queryByAltText(/write article button/i)).toBeNull()
      expect(
        screen.getByRole('button', { name: /new article/i }),
      ).toBeInTheDocument()
    })
  })

  describe('on mobile', () => {
    const preloadedState = {
      ...initialState,
      screenWidth: {
        isMobile: true,
      },
    }

    beforeEach(() => {
      act(() => {
        renderComponent(MenuBar, { needsStore, preloadedState })
      })
    })

    it('should render icon instead of text for "new article" button', () => {
      expect(screen.getByAltText(/write article button/i)).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /new article/i })).toBeNull()
    })
  })
})
