import { rest } from 'msw'
import { authenticate, getUrl, getUpdatedData } from './handlerUtils'
import {
  getMockUsers,
  getMockArticles,
  getMockTopics,
  getMockCategories,
  getMockReports,
} from '../utils/testing'

export const putHandlers = [
  //! PUT ROUTE HANDLERS

  //? Admin PUT Routes
  rest.put(getUrl('/admin/users'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const { firstName, lastName, emailAddress, accessLevel, password } =
      req.body
    if (firstName && lastName && emailAddress && accessLevel && password) {
      const id = req.url.searchParams.get('id')
      return res(
        ctx.status(201),
        ctx.json(getUpdatedData(getMockUsers, req.body, id)),
      )
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          entry: null,
        }),
      )
    }
  }),
  rest.put(getUrl('/admin/articles'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const { title, topic, intro, body, tags, authorId, published } = req.body
    if (title && topic && intro && body && tags && authorId && published) {
      const id = req.url.searchParams.get('id')
      return res(
        ctx.status(201),
        ctx.json(getUpdatedData(getMockArticles, req.body, id)),
      )
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          entry: null,
        }),
      )
    }
  }),
  rest.put(getUrl('/admin/topics'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const { name, categoryId, relatedTags } = req.body
    if (name && categoryId && relatedTags) {
      const id = req.url.searchParams.get('id')
      return res(
        ctx.status(201),
        ctx.json(getUpdatedData(getMockTopics, req.body, id)),
      )
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          entry: null,
        }),
      )
    }
  }),
  rest.put(getUrl('/admin/categories'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const { name } = req.body
    if (name) {
      const id = req.url.searchParams.get('id')
      return res(
        ctx.status(201),
        ctx.json(getUpdatedData(getMockCategories, req.body, id)),
      )
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          entry: null,
        }),
      )
    }
  }),
  rest.put(getUrl('/admin/reports'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const { title, description, userId } = req.body
    if (title && description && userId) {
      const id = req.url.searchParams.get('id')
      return res(
        ctx.status(201),
        ctx.json(getUpdatedData(getMockReports, req.body, id)),
      )
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          entry: null,
        }),
      )
    }
  }),
  rest.put(getUrl('/admin/users/block'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const id = req.url.searchParams.get('id')
    const entry = getMockUsers({ id })
    entry.blocked = true
    return res(ctx.status(201), ctx.json({ entry }))
  }),
  rest.put(getUrl('/admin/articles/block'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const id = req.url.searchParams.get('id')
    const entry = getMockArticles({ id })
    entry.blocked = true
    return res(ctx.status(201), ctx.json({ entry }))
  }),
  rest.put(getUrl('/admin/reports/mark'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    return res(ctx.status(204))
  }),

  //? Article PUT Routes
  rest.put(getUrl('/articles'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    return res(ctx.status(204))
  }),
  rest.put(getUrl('/articles/credit'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const id = req.url.searchParams.get('id')

    const mockArticle = getMockArticles({ id })
    mockArticle.credits =
      req.body.credit === 'accredit'
        ? mockArticle.credits + 1
        : mockArticle.credits - 1

    const mockOwner = getMockUsers({ id: mockArticle.userId })
    mockOwner.credits =
      req.body.credit === 'accredit'
        ? mockOwner.credits + 1
        : mockOwner.credits - 1

    const mockUser = getMockUsers()
    if (req.body.credit === 'accredit') {
      mockUser.discreditedArticles = mockUser.discreditedArticles.filter(
        (entry) => entry !== id,
      )
      !mockUser.accreditedArticles.includes(id) &&
        mockUser.accreditedArticles.push(id)
    } else {
      mockUser.accreditedArticles = mockUser.accreditedArticles.filter(
        (entry) => entry !== id,
      )
      !mockUser.discreditedArticles.includes(id) &&
        mockUser.discreditedArticles.push(id)
    }

    return res(
      ctx.status(200),
      ctx.json({
        article: mockArticle,
        user: mockUser,
        owner: mockOwner,
      }),
    )
  }),

  //? User PUT Routes
  rest.put(getUrl('/users'), (req, res, ctx) => {
    return res(ctx.status(204))
  }),
  rest.put(getUrl('/users/follow'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx)
    const user = getMockUsers()
    const target = getMockUsers({ id: 10 })
    user.following.push(target.id)

    return res(
      ctx.status(200),
      ctx.json({
        user,
        target,
      }),
    )
  }),
]
