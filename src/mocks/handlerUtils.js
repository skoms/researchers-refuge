import { getMockUsers } from '../utils/testing';

export const getUrl = (path) => {
  return process.env.REACT_APP_DEV_API + path;
};

export const authenticate = ( req, res, ctx ) =>{
  if ( !req.headers._headers.authorization ) {
    return res( 
      ctx.status(403), 
      ctx.json({ errorMessage: 'Unauthorized Access' }) 
    )
  }
  return false;
}

export const getListOfTypeData = (type, mockFunc, { count = 20, limit = 10, page = 1 } = {}) => {
  const offset = page !== 0 ? ((page - 1) * limit) : 0;

  const list = mockFunc({ amount: count }).slice( offset, offset + 10 );
  if ( type === 'articles' ) {
    list.forEach( (article, id) => {
      article.User = getMockUsers({ id });
    });
  } else if ( type === 'categories' ) {
    list.forEach( category => {
      category.Topics = getMockUsers({ amount: 3 });
    });
  }
  const hasMore = (count - (page * limit)) > 0;
  const lastPage = Math.ceil(count / limit);
  const rangeStart = (
    parseInt(page) === 1 ?
      1 : 
      (page - 1) * limit + 1
  );
  const rangeEnd = (
    parseInt(page) === 1 ? 
      list.indexOf( list[list.length - 1] ) + 1 : 
      list.indexOf( list[list.length - 1] )+ (limit * (page - 1)) + 1 
  );

  return {
    [type]: list,
    hasMore,
    lastPage,
    count,
    rangeStart,
    rangeEnd,
  }
}

export const getUpdatedData = ( mockFunc, body = {}, id = 1 ) => {
  const mockData = mockFunc({ id });
  Object.keys(body).forEach( key => {
    mockData[key] = body[key];
  })
  return { entry: mockData };
}
