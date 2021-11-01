import { rest } from 'msw'
import { authenticate, getUrl, getListOfTypeData } from './handlerUtils'
import {
  getMockUsers,
  getMockArticles,
  getMockTopics,
  getMockCategories,
  getMockReports,
} from '../utils/testing'

export const getHandlers = [
  //! GET ROUTE HANDLERS

  //? Admin Routes
  rest.get(getUrl('/admin/stats'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    return res(
      ctx.status(200),
      ctx.json({
        total: { users: 7324, articles: 1234, admins: 24 },
        new: { users: 977, articles: 201, admins: 2 },
        reports: { open: 14, resolved: 98, rejected: 17 },
      }),
    )
  }),
  rest.get(getUrl('/admin/users'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const limit = req.url.searchParams.get('limit')
    const page = req.url.searchParams.get('page')
    return res(
      ctx.status(200),
      ctx.json(
        getListOfTypeData('users', getMockUsers, { amount: 15, limit, page }),
      ),
    )
  }),
  rest.get(getUrl('/admin/users/search'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const limit = req.url.searchParams.get('limit')
    const page = req.url.searchParams.get('page')
    return res(
      ctx.status(200),
      ctx.json(
        getListOfTypeData('users', getMockUsers, { amount: 5, limit, page }),
      ),
    )
  }),
  rest.get(getUrl('/admin/articles'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const limit = req.url.searchParams.get('limit')
    const page = req.url.searchParams.get('page')
    return res(
      ctx.status(200),
      ctx.json(getListOfTypeData('articles', getMockArticles, { limit, page })),
    )
  }),
  rest.get(getUrl('/admin/articles/search'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const limit = req.url.searchParams.get('limit')
    const page = req.url.searchParams.get('page')
    return res(
      ctx.status(200),
      ctx.json(
        getListOfTypeData('articles', getMockArticles, {
          amount: 25,
          limit,
          page,
        }),
      ),
    )
  }),
  rest.get(getUrl('/admin/topics'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const limit = req.url.searchParams.get('limit')
    const page = req.url.searchParams.get('page')
    return res(
      ctx.status(200),
      ctx.json(
        getListOfTypeData('topics', getMockTopics, { amount: 40, limit, page }),
      ),
    )
  }),
  rest.get(getUrl('/admin/topics/search'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const limit = req.url.searchParams.get('limit')
    const page = req.url.searchParams.get('page')
    return res(
      ctx.status(200),
      ctx.json(
        getListOfTypeData('topics', getMockTopics, { amount: 20, limit, page }),
      ),
    )
  }),
  rest.get(getUrl('/admin/categories'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const limit = req.url.searchParams.get('limit')
    const page = req.url.searchParams.get('page')
    return res(
      ctx.status(200),
      ctx.json(
        getListOfTypeData('categories', getMockCategories, {
          amount: 5,
          limit,
          page,
        }),
      ),
    )
  }),
  rest.get(getUrl('/admin/categories/search'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const limit = req.url.searchParams.get('limit')
    const page = req.url.searchParams.get('page')
    return res(
      ctx.status(200),
      ctx.json(
        getListOfTypeData('categories', getMockCategories, {
          amount: 2,
          limit,
          page,
        }),
      ),
    )
  }),
  rest.get(getUrl('/admin/reports'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const limit = req.url.searchParams.get('limit')
    const page = req.url.searchParams.get('page')
    return res(
      ctx.status(200),
      ctx.json(getListOfTypeData('reports', getMockReports, { limit, page })),
    )
  }),
  rest.get(getUrl('/admin/reports/search'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const limit = req.url.searchParams.get('limit')
    const page = req.url.searchParams.get('page')
    return res(
      ctx.status(200),
      ctx.json(
        getListOfTypeData('reports', getMockReports, {
          amount: 25,
          limit,
          page,
        }),
      ),
    )
  }),

  //? Article Routes
  rest.get(getUrl('/articles/filter'), (req, res, ctx) => {
    const mockArticles = getMockArticles({ amount: 15 })
    mockArticles.forEach((article, id) => {
      article.User = getMockUsers({ id: id + 1 })
    })

    return res(
      ctx.status(200),
      ctx.json({
        articles: mockArticles,
        hasMore: true,
        lastPage: 5,
      }),
    )
  }),
  rest.get(getUrl('/articles/recommended'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const mockArticles = getMockArticles({ amount: 3 })

    return res(ctx.status(200), ctx.json(mockArticles))
  }),
  rest.get(getUrl('/articles/tag'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getMockArticles({ amount: 5 })))
  }),
  rest.get(getUrl('/articles/query'), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        articles: getMockArticles({ amount: 15 }),
        hasMore: true,
        lastPage: 3,
      }),
    )
  }),
  rest.get(getUrl('/articles/following'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    return res(
      ctx.status(200),
      ctx.json({
        articles: getMockArticles({ amount: 15 }),
        hasMore: true,
        lastPage: 3,
      }),
    )
  }),
  rest.get(getUrl('/articles'), (req, res, ctx) => {
    const id = req.url.searchParams.get('id')
    return res(ctx.status(200), ctx.json(getMockArticles({ id })))
  }),
  rest.get(getUrl('/articles/owner'), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        articles: getMockArticles({ amount: 5 }),
        hasMore: false,
        lastPage: 1,
      }),
    )
  }),

  //? Category GET Routes
  rest.get(getUrl('/categories'), (req, res, ctx) => {
    const mockCategories = getMockCategories({ amount: 3 })
    mockCategories.forEach((category) => {
      category.Topics = getMockTopics({ amount: 3 })
    })

    return res(ctx.status(200), ctx.json(mockCategories))
  }),
  rest.get(getUrl('/categories'), (req, res, ctx) => {
    const mockCategory = getMockCategories()
    mockCategory.Topics = getMockTopics({ amount: 3 })

    return res(ctx.status(200), ctx.json(mockCategory))
  }),
  rest.get(getUrl('/categories/query'), (req, res, ctx) => {
    const mockCategories = getMockCategories({ amount: 2 })
    mockCategories.forEach((category) => {
      category.Topics = getMockTopics({ amount: 3 })
    })

    return res(ctx.status(200), ctx.json(mockCategories))
  }),

  //? Report GET Routes
  rest.get(getUrl('/reports'), (req, res, ctx) => {
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage:
          'Reports can only be accessed with the correct authorization and through its designated admin route',
      }),
    )
  }),

  //? Topic GET Routes
  rest.get(getUrl('/topics'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getMockTopics({ amount: 40 })))
  }),
  rest.get(getUrl('/topics/tag'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getMockTopics({ amount: 5 })))
  }),
  rest.get(getUrl('/topics/query'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getMockTopics({ amount: 5 })))
  }),
  rest.get(getUrl('/topics/name'), (req, res, ctx) => {
    const topic = getMockTopics()
    topic.Articles = getMockArticles({ amount: 5 })
    return res(
      ctx.status(200),
      ctx.json({
        topic,
        hasMore: false,
        lastPage: 1,
      }),
    )
  }),
  rest.get(getUrl('/topics/id'), (req, res, ctx) => {
    const id = req.url.searchParams.get('id')
    return res(ctx.status(200), ctx.json(getMockTopics({ id })))
  }),
  rest.get(getUrl('/topics/recommended'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const mockTopics = getMockTopics({ amount: 3 })

    return res(ctx.status(200), ctx.json(mockTopics))
  }),

  //? User GET Routes
  rest.get(getUrl('/users'), (req, res, ctx) => {
    const id = req.url.searchParams.get('id')
    return res(ctx.status(200), ctx.json(getMockUsers({ id })))
  }),
  rest.get(getUrl('/users/me'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    return res(ctx.status(200), ctx.json(getMockUsers()))
  }),
  rest.get(getUrl('/users/recommended'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const mockUsers = getMockUsers({ amount: 3 })

    return res(ctx.status(200), ctx.json(mockUsers))
  }),
  rest.get(getUrl('/users/query'), (req, res, ctx) => {
    const users = getMockUsers({ amount: 6 })
    users.shift()
    return res(ctx.status(200), ctx.json(users))
  }),
]
