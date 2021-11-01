import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderComponent } from '../../utils/testing'
import TypedButton from './TypedButton'

const mockOnClick = jest.fn()

describe('TypedButton', () => {
  describe('General / Primary Button', () => {
    const options = {
      expectedProps: {
        buttontype: 'primary',
        onClick: mockOnClick,
        content: 'test text',
        className: 'testClassName',
      },
    }
    beforeEach(() => renderComponent(TypedButton, options))
    afterEach(() => jest.resetAllMocks())

    it('should render with content and without any errors', () => {
      expect(
        screen.getByRole('button', { name: /test text/i }),
      ).toBeInTheDocument()
    })

    it('should render with the "primaryButton" class as well as the props one', () => {
      expect(screen.getByRole('button', { name: /test text/i })).toHaveClass(
        'primaryButton testClassName',
      )
    })

    it('should fire the onclick passed through props', () => {
      userEvent.click(screen.getByRole('button'))
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Secondary Button', () => {
    const options = {
      expectedProps: {
        buttontype: 'secondary',
        onClick: mockOnClick,
        content: 'test text',
        className: 'testClassName',
      },
    }
    beforeEach(() => renderComponent(TypedButton, options))
    afterEach(() => jest.resetAllMocks())

    it('should render with content and without any errors', () => {
      expect(
        screen.getByRole('button', { name: /test text/i }),
      ).toBeInTheDocument()
    })

    it('should render with the "secondaryButton" class as well as the props one', () => {
      expect(screen.getByRole('button', { name: /test text/i })).toHaveClass(
        'secondaryButton testClassName',
      )
    })
  })
})
