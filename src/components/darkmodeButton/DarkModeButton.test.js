import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderComponent } from '../../utils/testing'
import DarkModeButton from './DarkModeButton'

const needsStore = true

describe('DarkModeButton', () => {
  let store
  beforeEach(() => {
    act(() => {
      store = renderComponent(DarkModeButton, { needsStore }).store
    })
  })

  it('should render without any errors', () => {
    expect(screen.getByAltText(/darkmode button/i)).toBeInTheDocument()
  })

  it('should initially render with moon icon', () => {
    expect(screen.getByAltText(/darkmode button/i).src).toBe(
      'https://img.icons8.com/ios-filled/24/FFFFFF/crescent-moon.png',
    )
  })

  it('should render sun icon after clicked', () => {
    userEvent.click(screen.getByAltText(/darkmode button/i))
    expect(screen.getByAltText(/darkmode button/i).src).toBe(
      'https://img.icons8.com/material-rounded/24/FFFFFF/sun--v1.png',
    )
  })

  it('should toggle the darkmode after clicked', () => {
    userEvent.click(screen.getByAltText(/darkmode button/i))
    expect(store.getState().darkModeButton.darkModeOn).toBe(true)
  })

  it('should toggle the darkmode back after clicked again', () => {
    userEvent.click(screen.getByAltText(/darkmode button/i))
    userEvent.click(screen.getByAltText(/darkmode button/i))
    expect(store.getState().darkModeButton.darkModeOn).toBe(false)
  })
})
