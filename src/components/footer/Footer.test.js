import { screen } from '@testing-library/react'
import { renderComponent } from '../../utils/testing'
import Footer from './Footer'

describe('Footer', () => {
  it('should render without any errors', () => {
    renderComponent(Footer)
    expect(screen.getByText(/2021 researchers/i)).toBeInTheDocument()
  })
})
