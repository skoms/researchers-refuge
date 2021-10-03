import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toFirstPage } from "../../../paginationBar/paginationBarSlice";
import { selectSearchQuery, updateSearchQuery, updateSortOrder } from "../../adminPanelSlice";

const TableSearch = () => {
  const searchField = document.querySelector('[data-table-search-field]');
  const searchQuery = useSelector(selectSearchQuery);
  const dispatch = useDispatch();

  const search = e => {
    e.preventDefault();
    dispatch(updateSearchQuery(searchField.value));
    dispatch(updateSortOrder());
    dispatch(toFirstPage());
    searchField.value = '';
  }

  const clearSearch = () => {
    searchField.value = '';
    dispatch(updateSearchQuery(''));
    dispatch(updateSortOrder());
    dispatch(toFirstPage());
  }

  const clearTermIfEmpty = () => {
    if (!searchField.value) {
      dispatch(updateSearchQuery(''));
      dispatch(updateSortOrder());
      dispatch(toFirstPage());
    }
  }
  return (
    <div className="table-search">
      <form onSubmit={search} className='table-search-form'>
        { searchQuery !== '' && <button className="clear-search" onClick={clearSearch}>
          <img src="https://img.icons8.com/fluency-systems-filled/18/64B5F7/xbox-x.png" alt='clear search button'/>
        </button>}
        <input type="text" className='table-search-field' data-table-search-field placeholder='Search...' onChange={clearTermIfEmpty}/>
        <button type='submit' className="search-button">
          <img src="https://img.icons8.com/material-outlined/18/64B5F7/search--v1.png" alt='search button'/>
        </button>
      </form>
    </div>
  )
}

export default TableSearch
