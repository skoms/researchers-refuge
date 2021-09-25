import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectHasMore, selectPage,
  toFirstPage, toLastPage,
  decrementPage, incrementPage
} from './paginationBarSlice';

const PaginationBar = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const hasMore = useSelector(selectHasMore);

  useEffect(() => {
    
  });

  return (
    <div className="pagination-bar">
      { page !== 1 &&
        <Fragment>
          <button className="first" onClick={() => dispatch(toFirstPage())}>First</button>
          <button className="prev" onClick={() => dispatch(decrementPage())}>Prev</button>
        </Fragment>
      }
      <div className="page-btn">
        { page !== 1 && <button className='prev-page' onClick={() => dispatch(decrementPage())}>{page - 1}</button> }
        <button className='current-page'>{page}</button>
        { hasMore && <button className='next-page' onClick={() => dispatch(incrementPage())}>{page + 1}</button> }
      </div>
      { hasMore && 
        <Fragment>
          <button className="next" onClick={() => dispatch(incrementPage())}>Next</button>
          <button className="last" onClick={() => dispatch(toLastPage())}>Last</button>
        </Fragment>
      }
    </div>
  )
}

export default PaginationBar
