import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaginationBar from "../../paginationBar/PaginationBar";
import { selectPage, toFirstPage } from "../../paginationBar/paginationBarSlice";
import { ManagementTable } from "./subcomponents/ManagementTable";
import { selectAuthenticatedUser } from "../../user/userAccManage/userAccSlice";
import TableSearch from "./subcomponents/TableSearch";
import EntriesSelect from "./subcomponents/EntriesSelect";
import { getArticlesAdmin, getArticlesByQueryAdmin, selectArticles } from "../adminPanelSlice";


const ArticleManagement = () => {
  const columns = [
    { column: 'title', name: 'Title', input: false },
    { column: 'topic', name: 'Topic', input: false },
    { column: 'author', name: 'Author', input: false },
    { column: 'published', name: 'Published', input: false },
    { column: 'credits', name: 'Credits', input: false },
    { column: 'createdAt', name: 'Created', input: false },
    { column: 'updatedAt', name: 'Last Updated', input: false }
  ];
  const [searchQuery, setSearchQuery] = useState('');
  const user = useSelector(selectAuthenticatedUser);
  const dispatch = useDispatch();
  const tablePage = useSelector(selectPage);
  const [entriesLimit, setEntriesLimit] = useState(5);
  const [sortOrder, setSortOrder] = useState({ column: 'id', order: 'ASC' });
  const searchField = document.querySelector('[data-table-search-field]');
  const articles = useSelector(selectArticles);

  const ascImg = <img src="https://img.icons8.com/material-outlined/20/FFFFFF/generic-sorting-2.png" alt='ascending filter'/>
  const descImg = <img src="https://img.icons8.com/material-outlined/20/FFFFFF/generic-sorting.png" alt='descending filter'/>
  
  const handleSort = e => {
    const { value } = e.target.dataset;
    const { column, order } = sortOrder;
    if (!column) {
      setSortOrder({ column: value, order: 'ASC' });
    } else if (column !== value) {
      setSortOrder({ column: value, order: 'ASC' });
    } else if (column === value) {
      setSortOrder({ column: value, order: order === 'ASC' ? 'DESC' : 'ASC' });
    }
  }

  const getSortImg = () => {
    return (
      (sortOrder.order === 'ASC' && ascImg) || 
      ( sortOrder.order === 'DESC' && descImg)
    );
  }

  const limitChangeHandler = e => {
    setEntriesLimit(e.target.value);
    dispatch(toFirstPage());
  }

  const search = e => {
    e.preventDefault();
    setSearchQuery(searchField.value);
    dispatch(toFirstPage());
  }

  const clearSearch = () => {
    searchField.value = '';
    setSearchQuery('');
    dispatch(toFirstPage());
  }

  const clearTermIfEmpty = () => {
    if (!searchField.value) {
      setSearchQuery('');
      dispatch(toFirstPage());
    }
  }

  useEffect(() => {
    if (user) {
      if (!searchQuery) {
        dispatch(getArticlesAdmin({ user, limit: entriesLimit, page: tablePage, sortColumn: sortOrder.column, sortOrder: sortOrder.order }));
      } else {
        dispatch(getArticlesByQueryAdmin({ user, query: searchQuery, limit: entriesLimit, page: tablePage, sortColumn: sortOrder.column, sortOrder: sortOrder.order }));
      }
    }
  }, [dispatch, user, entriesLimit, tablePage, sortOrder, searchQuery]);

  return (
    <div className="access-management-div">
      <h2 className='title'>Article Management</h2>
      <EntriesSelect 
        limitChangeHandler={limitChangeHandler}
      />
      <TableSearch 
        search={search}
        searchQuery={searchQuery}
        clearSearch={clearSearch}
        clearTermIfEmpty={clearTermIfEmpty}
      />
      <ManagementTable 
        columns={columns}
        handleSort={handleSort}
        sortOrder={sortOrder}
        getSortImg={getSortImg}
        inputChangeHandler={null}
        data={articles}
      />
      <p className='entries-count'>{`Showing ${articles.rangeStart} to ${articles.rangeEnd} of ${articles.total} entries`}</p>
      <PaginationBar use='admin' />
    </div>
  )
}

export default ArticleManagement
