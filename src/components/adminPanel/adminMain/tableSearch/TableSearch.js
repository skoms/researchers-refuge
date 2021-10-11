import { useDispatch } from "react-redux";
import { useRef, useState } from 'react';
import styles from './TableSearch.module.css';
import { toFirstPage } from "../../../paginationBar/paginationBarSlice";
import { updateSearchQuery, updateSortOrder } from "../../adminPanelSlice";
import useDebounce from '../../../../customHooks/useDebounce';

const TableSearch = () => {
  const searchField = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  
  const search = () => {
    dispatch(updateSearchQuery(searchTerm));
    dispatch(updateSortOrder());
    dispatch(toFirstPage());
  }

  const clearSearch = () => {
    dispatch(updateSearchQuery(''));
    dispatch(updateSortOrder());
    dispatch(toFirstPage());
    searchField.current.value = '';
  }

  const onChangeHandler = (e) => {
    if (!e.target.value) {
      setSearchTerm('');
    } else {
      setSearchTerm(e.target.value);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if ( searchField.current.value === '' ) {
      clearSearch();
    } else {
      search();
    }
  }

  useDebounce(() => search(), 1000, [searchTerm]);

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.searchForm}>
        { searchTerm !== '' && 
          <button className={styles.clearSearch} onClick={clearSearch}>
            <img src="https://img.icons8.com/fluency-systems-filled/18/64B5F7/xbox-x.png" alt='clear search button' />
          </button>
        }
        <input type="text" className={styles.searchField} ref={searchField} placeholder='Search...' onChange={onChangeHandler} />
        <button type='submit' className={styles.searchButton}>
          <img src="https://img.icons8.com/material-outlined/18/64B5F7/search--v1.png" alt='search button'/>
        </button>
      </form>
    </div>
  )
}

export default TableSearch
