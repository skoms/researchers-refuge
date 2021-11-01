import { screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { getInitialState, renderComponent } from '../../utils/testing'
import ImageUploader from './ImageUploader'

jest.mock('axios')

const mockToggleHeaderUploader = jest.fn()
const mockToggleProfileUploader = jest.fn()

const needsStore = true
const needsMemoryRouter = true
const initialState = getInitialState()
const preloadedState = {
  ...initialState,
  userAcc: {
    loggedIn: true,
    authenticatedUser: {
      id: 1,
      firstName: 'test',
      lastName: 'user',
    },
  },
}

describe('ImageUploader', () => {
  describe('general (profile)', () => {
    const expectedProps = {
      purpose: 'profile',
      toggleHeaderUploader: mockToggleHeaderUploader,
      toggleProfileUploader: mockToggleProfileUploader,
    }
    let store
    beforeEach(async () => {
      axios.mockResolvedValueOnce({
        status: 200,
        url: 'https:testURL.com',
      })

      axios.mockResolvedValueOnce({ status: 204 })

      await act(async () => {
        store = await renderComponent(ImageUploader, {
          preloadedState,
          expectedProps,
          needsStore,
          needsMemoryRouter,
        }).store
      })
    })

    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('should render without any errors', () => {
      expect(screen.getByTestId('image-uploader-component')).toBeInTheDocument()
    })

    it('should render correct header', () => {
      expect(
        screen.getByRole('heading', { name: /profile image/i }),
      ).toBeInTheDocument()
    })

    it('should upload fake "image" on click of "upload"', async () => {
      userEvent.click(screen.getByRole('button', { name: /upload/i }))
      await waitFor(() => {
        expect(
          store.getState().userAcc.authenticatedUser.profileImgURL,
        ).toStrictEqual('https:testURL.com')
      })
    })

    it('should call the respective toggle after upload is successful', () => {
      userEvent.click(screen.getByRole('button', { name: /upload/i }))
      expect(mockToggleProfileUploader).toHaveBeenCalledTimes(1)
    })
  })

  describe('header', () => {
    const expectedProps = {
      purpose: 'header',
      toggleHeaderUploader: mockToggleHeaderUploader,
      toggleProfileUploader: mockToggleProfileUploader,
    }
    let store
    beforeEach(async () => {
      axios.mockResolvedValueOnce({
        status: 200,
        url: 'https:testURL.com',
      })

      axios.mockResolvedValueOnce({ status: 204 })

      await act(async () => {
        store = await renderComponent(ImageUploader, {
          preloadedState,
          expectedProps,
          needsStore,
          needsMemoryRouter,
        }).store
      })
    })

    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('should render without any errors', () => {
      expect(screen.getByTestId('image-uploader-component')).toBeInTheDocument()
    })

    it('should render correct header', () => {
      expect(
        screen.getByRole('heading', { name: /header image/i }),
      ).toBeInTheDocument()
    })

    it('should upload fake "image" on click of "upload"', async () => {
      userEvent.click(screen.getByRole('button', { name: /upload/i }))
      await waitFor(() => {
        expect(
          store.getState().userAcc.authenticatedUser.headerImgURL,
        ).toStrictEqual('https:testURL.com')
      })
    })

    it('should call the respective toggle after upload is successful', () => {
      userEvent.click(screen.getByRole('button', { name: /upload/i }))
      expect(mockToggleHeaderUploader).toHaveBeenCalledTimes(1)
    })
  })
})
