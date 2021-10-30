import { rest } from 'msw';
import { getUrl, authenticate } from './handlerUtils';

export const deleteHandlers = [
  //! DELETE ROUTE HANDLERS 

  //? Admin DELETE routes 
  rest.delete(getUrl('/admin/users'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx);
    return res( ctx.status(204) );
  }),
  rest.delete(getUrl('/admin/articles'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx);
    return res( ctx.status(204) );
  }),
  rest.delete(getUrl('/admin/topics'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx);
    return res( ctx.status(204) );
  }),
  rest.delete(getUrl('/admin/categories'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx);
    return res( ctx.status(204) );
  }),
  rest.delete(getUrl('/admin/reports'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx);
    return res( ctx.status(204) );
  }),
  

  //? Article DELETE Routes
  rest.delete(getUrl('/articles'), (req, res, ctx) => {
    if (authenticate(req, res, ctx)) return authenticate(req, res, ctx);
    return res( ctx.status(204) )
  }),
];