import { act, screen, waitFor } from '@testing-library/react'
import { server } from '../../mocks/server'
import { getUrl } from '../../mocks/handlerUtils'
import { rest } from 'msw'
import {
  getInitialState,
  getMockUsers,
  renderComponent,
} from '../../utils/testing'
import RecommendModule from './RecommendModule'

const initialState = getInitialState()
const options = {
  needsStore: true,
  preloadedState: {
    ...initialState,
    userAcc: {
      authenticatedUser: getMockUsers(),
    },
  },
}

describe('RecommendModule', () => {
  it('should render without any errors', async () => {
    renderComponent(RecommendModule, options)
    expect(
      screen.queryByTestId('recommend-module-component'),
    ).toBeInTheDocument()
  })

  it('should render all the tables with data', async () => {
    await act(async () => {
      await renderComponent(RecommendModule, options)
    })

    await waitFor(() => {
      expect(screen.getAllByText(/recommended/i)).toHaveLength(3)
      expect(
        screen.getAllByRole('cell', { name: /(test topic\d)/i }),
      ).toHaveLength(3)
      expect(
        screen.getAllByRole('cell', { name: /(test title\d)/i }),
      ).toHaveLength(3)
      expect(
        screen.getAllByRole('cell', { name: /(test\d user\d)/i }),
      ).toHaveLength(3)
    })
  })

  it('should only render topic table with data', async () => {
    server.use(
      rest.get(getUrl('/articles/recommended'), (req, res, ctx) =>
        res(ctx.status(200), ctx.json([])),
      ),
      rest.get(getUrl('/users/recommended'), (req, res, ctx) =>
        res(ctx.status(200), ctx.json([])),
      ),
    )

    await act(async () => {
      await renderComponent(RecommendModule, options)
    })

    await waitFor(() => {
      expect(screen.getAllByText(/recommended/i)).toHaveLength(1)
      expect(
        screen.getAllByRole('cell', { name: /(test topic\d)/i }),
      ).toHaveLength(3)
    })
  })

  it('should only render articles table with data', async () => {
    server.use(
      rest.get(getUrl('/topics/recommended'), (req, res, ctx) =>
        res(ctx.status(200), ctx.json([])),
      ),
      rest.get(getUrl('/users/recommended'), (req, res, ctx) =>
        res(ctx.status(200), ctx.json([])),
      ),
    )

    await act(async () => {
      await renderComponent(RecommendModule, options)
    })

    await waitFor(() => {
      expect(screen.getAllByText(/recommended/i)).toHaveLength(1)
      expect(
        screen.getAllByRole('cell', { name: /(test title\d)/i }),
      ).toHaveLength(3)
    })
  })

  it('should only render users table with data', async () => {
    server.use(
      rest.get(getUrl('/topics/recommended'), (req, res, ctx) =>
        res(ctx.status(200), ctx.json([])),
      ),
      rest.get(getUrl('/articles/recommended'), (req, res, ctx) =>
        res(ctx.status(200), ctx.json([])),
      ),
    )

    await act(async () => {
      await renderComponent(RecommendModule, options)
    })

    await waitFor(() => {
      expect(screen.getAllByText(/recommended/i)).toHaveLength(1)
      expect(
        screen.getAllByRole('cell', { name: /(test\d user\d)/i }),
      ).toHaveLength(3)
    })
  })
})
