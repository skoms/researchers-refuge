import { screen, act } from '@testing-library/react'
import { renderComponent } from '../../utils/testing'
import InfoModule from './InfoModule'

describe('InfoModule', () => {
  describe('general', () => {
    const expectedProps = {
      user: {
        firstName: 'test',
        lastName: 'user',
        occupation: 'tester',
        bio: 'test bio',
        mostActiveField: 'testing',
        articles: 1,
        credits: 10,
        followers: [1, 2, 3],
        following: [1, 2, 3, 4],
        profileImgURL: 'https://randomuser.me/api/portraits/men/75.jpg',
        accessLevel: 'none',
      },
    }
    beforeEach(() => {
      act(() => {
        renderComponent(InfoModule, { expectedProps })
      })
    })

    it('should render without any errors', () => {
      expect(screen.getByText(/test user/i)).toBeInTheDocument()
    })

    it('should render the image given through props', () => {
      expect(screen.getByRole('img').src).toBe(
        'https://randomuser.me/api/portraits/men/75.jpg',
      )
    })

    it('should not render with admin icon', () => {
      expect(screen.queryByAltText(/admin icon/i)).toBeNull()
    })

    it('should render cells with prop data', () => {
      expect(
        screen.getAllByRole('cell', { name: /(testing)|(1)|(10)|(3)|(4)/i }),
      ).toHaveLength(5)
    })
  })

  describe('as admin', () => {
    const expectedProps = {
      user: {
        firstName: 'test',
        lastName: 'user',
        occupation: 'tester',
        bio: 'test bio',
        mostActiveField: 'testing',
        articles: 1,
        credits: 10,
        followers: [1, 2, 3],
        following: [1, 2, 3, 4],
        profileImgURL: 'https://randomuser.me/api/portraits/men/75.jpg',
        accessLevel: 'admin',
      },
    }
    beforeEach(() => {
      act(() => {
        renderComponent(InfoModule, { expectedProps })
      })
    })

    it('should render the admin icon behing name', () => {
      expect(screen.getByAltText(/admin icon/i)).toBeInTheDocument()
    })
  })

  describe('With missing props', () => {
    const expectedProps = {
      user: {
        firstName: 'test',
        lastName: 'user',
        occupation: 'tester',
        bio: 'test bio',
        accessLevel: 'none',
      },
    }
    beforeEach(() => {
      act(() => {
        renderComponent(InfoModule, { expectedProps })
      })
    })

    it('should render the image given through props', () => {
      expect(screen.getByRole('img').src).toBe(
        'https://img.icons8.com/ios-glyphs/75/FFFFFF/user--v1.png',
      )
    })

    it('should not render with admin icon', () => {
      expect(screen.queryByAltText(/admin icon/i)).toBeNull()
    })

    it('should render cells with default data', () => {
      expect(screen.getAllByRole('cell', { name: /^()|(0)$/i })).toHaveLength(5)
    })
  })
})
