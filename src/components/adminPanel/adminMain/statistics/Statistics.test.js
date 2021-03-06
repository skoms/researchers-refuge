import { screen } from '@testing-library/react'
import Statistics from './Statistics'
import { getInitialState, renderComponent } from '../../../../utils/testing'

const initialState = getInitialState()

const preloadedState = {
  ...initialState,
  adminPanel: {
    ...initialState.adminPanel,
    stats: {
      total: {
        users: 7324,
        articles: 1234,
        admins: 24,
      },
      new: {
        users: 977,
        articles: 201,
        admins: 2,
      },
      reports: {
        open: 14,
        resolved: 98,
        rejected: 17,
      },
    },
  },
}

const needsStore = true

describe('Statistics', () => {
  beforeEach(() => {
    renderComponent(Statistics, { needsStore, preloadedState })
  })

  it('should render all tables without errors', () => {
    expect(screen.getAllByText(/(total)|(new)|(reports)/i).length).toBe(3)
  })

  it('should display correct data from the store', () => {
    expect(
      screen.getAllByRole('table').length +
        screen.getAllByText(/^(7234)|(1234)|(24)$/i).length +
        screen.getAllByText(/^(977)|(201)|(2)$/i).length +
        screen.getAllByText(/^(14)|(98)|(17)$/i).length,
    ).toBe(12)
  })
})
