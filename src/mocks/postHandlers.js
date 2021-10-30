import { rest } from 'msw';
import { authenticate, getUrl, getUpdatedData } from './handlerUtils';
import { getMockUsers, getMockArticles, getMockTopics, getMockCategories, getMockReports } from '../utils/testing';

export const postHandlers = [
  //! POST ROUTE HANDLERS 


  //? Admin Routes
  rest.post(getUrl('/admin/users'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx);
    const { firstName, lastName, emailAddress, accessLevel, password } = req.body;
    if ( firstName && lastName && emailAddress && accessLevel && password ) {
      return res(
        ctx.status(201),
        ctx.json(
          getUpdatedData(getMockUsers, req.body)
        )
      )
    } else {
      return res( 
        ctx.status(400),
        ctx.json({
          entry: null
        }) 
      );
    }
  }),
  rest.post(getUrl('/admin/articles'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx);
    const { title, topic, intro, body, tags, authorId, published } = req.body;
    if ( title && topic && intro && body && tags && authorId && published ) {    
      return res(
        ctx.status(201),
        ctx.json(
          getUpdatedData(getMockArticles, req.body)
        )
      )
    } else {
      return res( 
        ctx.status(400),
        ctx.json({
          entry: null
        }) 
      );
    }
  }),
  rest.post(getUrl('/admin/topics'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx);
    const { name, categoryId, relatedTags } = req.body;
    if ( name && categoryId && relatedTags ) {
      return res(
        ctx.status(201),
        ctx.json(
          getUpdatedData(getMockTopics, req.body)
        )
      )
    } else {
      return res( 
        ctx.status(400),
        ctx.json({
          entry: null
        }) 
      );
    }
  }),
  rest.post(getUrl('/admin/categories'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx);
    const { name } = req.body;
    if ( name ) {
      return res(
        ctx.status(201),
        ctx.json(
          getUpdatedData(getMockCategories, req.body)
        )
      )
    } else {
      return res( 
        ctx.status(400),
        ctx.json({
          entry: null
        }) 
      );
    }
  }),
  rest.post(getUrl('/admin/reports'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx);
    const { title, description, userId } = req.body;
    if ( title && description && userId ) {
      return res(
        ctx.status(201),
        ctx.json(
          getUpdatedData(getMockReports, req.body)
        )
      )
    } else {
      return res( 
        ctx.status(400),
        ctx.json({
          entry: null
        }) 
      );
    }
  }),


  //? Article POST Routes
  rest.post(getUrl('/articles'), (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json( getUpdatedData(getMockArticles, req.body) )
    )
  }),


  //? Report POST Routes
  rest.post(getUrl('/reports'), (req, res, ctx) => {
    return res( ctx.status(204) );
  }),


  //? User POST Routes
  rest.post(getUrl('/users'), (req, res, ctx) => {
    return res(
      ctx.status(201)
    )
  }),
];