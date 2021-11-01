import { screen, act } from '@testing-library/react'
import { renderComponent } from '../../utils/testing'
import Loading from './Loading'

describe('Loading', () => {
  it('should render without errors', () => {
    act(() => {
      renderComponent(Loading)
    })
    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
  })
})
