import React, { Fragment } from 'react'
import styles from './PaginationBar.module.css';
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
    const value = e.target.getAttribute('data-value');
    if (value === 'first') {
      dispatch(toFirstPage());
    } else if (value === 'prev' || value === 'prev-page') {
      dispatch(decrementPage());
    } else if (value === 'next' || value === 'next-page') {
      dispatch(incrementPage());
    } else if (value === 'last') {
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

  return !hasMore && page === 1 ? ( 
    <Fragment />
   ) : (
    <div className={`${styles.container} ${use || ''}`}>
      { page !== 1 &&
        <div className={styles.navBefore}>
          { lastPage > 3 && <button data-value='first' className={styles.button} onClick={updatePage}>First</button>}
          <button data-value='prev' className={styles.button} onClick={updatePage}>Prev</button>
        </div>
      }
      <div className={styles.pageButtons}>
        { page !== 1 && <button data-value='prev-page' className={styles.prevPage} onClick={updatePage}>{page - 1}</button> }
        <button className={styles.currentPage}>{page}</button>
        { hasMore && <button data-value='next-page' className={styles.nextPage} onClick={updatePage}>{page + 1}</button> }
      </div>
      { hasMore && 
        <div className={styles.navAfter}>
          <button  data-value='next' className={styles.button} onClick={updatePage}>Next</button>
          { lastPage > 3 &&<button data-value='last' className={styles.button} onClick={updatePage}>Last</button>}
        </div>
      }
    </div>
  )
}

export default PaginationBar
