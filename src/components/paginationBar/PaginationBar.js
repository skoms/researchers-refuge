import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectHasMore, selectPage, selectLastPage,
  toFirstPage, toLastPage,
  decrementPage, incrementPage
} from './paginationBarSlice';

const PaginationBar = ({ use }) => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const hasMore = useSelector(selectHasMore);
  const lastPage = useSelector(selectLastPage);

  const updatePage = (e) => {
    const { className } = e.target;
    if (className === 'first') {
      dispatch(toFirstPage());
    } else if (className === 'prev' || className === 'prev-page') {
      dispatch(decrementPage());
    } else if (className === 'next' || className === 'next-page') {
      dispatch(incrementPage());
    } else if (className === 'last') {
      dispatch(toLastPage());
    }
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
    if (use !== 'admin') {
      const articleCards = e.target.parentElement.parentElement.parentElement;
      articleCards.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });
    }
  }

  return (
    <div className="pagination-bar">
      { page !== 1 &&
        <div className='nav-before'>
          { lastPage > 3 && <button className="first" onClick={updatePage}>First</button>}
          <button className="prev" onClick={updatePage}>Prev</button>
        </div>
      }
      <div className="page-btn">
        { page !== 1 && <button className='prev-page' onClick={updatePage}>{page - 1}</button> }
        <button className='current-page'>{page}</button>
        { hasMore && <button className='next-page' onClick={updatePage}>{page + 1}</button> }
      </div>
      { hasMore && 
        <div className='nav-after'>
          <button className="next" onClick={updatePage}>Next</button>
          { lastPage > 3 &&<button className="last" onClick={updatePage}>Last</button>}
        </div>
      }
    </div>
  )
}

export default PaginationBar
