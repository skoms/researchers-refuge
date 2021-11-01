import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EntriesSelect from './EntriesSelect'
import { renderComponent } from '../../../../utils/testing'

const needsStore = true

describe('Entries Select', () => {
  beforeEach(() => {
    renderComponent(EntriesSelect, { needsStore })
  })

  it('should render without any errors', () => {
    expect(screen.getByText(/show/i)).toBeInTheDocument()
  })

  it('should render select with initial value 5', () => {
    expect(screen.getByRole('option', { name: '5' }).selected).toBe(true)
  })

  it('should call changeHandler on change', () => {
    const selectElement = screen.getByRole('combobox')
    const mockChangeHandler = jest.fn()
    selectElement.onchange = mockChangeHandler

    userEvent.selectOptions(
      selectElement,
      screen.getByRole('option', { name: '10' }),
    )

    expect(mockChangeHandler).toHaveBeenCalledTimes(1)
  })

  it('should change correctly change selected on change', () => {
    const selectElement = screen.getByRole('combobox')

    userEvent.selectOptions(
      selectElement,
      screen.getByRole('option', { name: '10' }),
    )

    expect(screen.getByRole('option', { name: '10' }).selected).toBe(true)
  })
})
