import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaginationBar from "../../paginationBar/PaginationBar";
import { selectPage, toFirstPage } from '../../paginationBar/paginationBarSlice';
import { selectAuthenticatedUser } from "../../user/userAccManage/userAccSlice";
import { getUsersAdmin, selectUsers } from "../adminPanelSlice";

const UserManagement = () => {
  const users = useSelector(selectUsers);
  const user = useSelector(selectAuthenticatedUser);
  const dispatch = useDispatch();
  const tablePage = useSelector(selectPage);
  const [entriesLimit, setEntriesLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState({ column: 'id', order: 'ASC' });
  const searchField = document.querySelector('[data-table-search-field]');

  const [newUser, setNewUser] = useState({ });

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

  const inputChangeHandler = e => {
    const { column } = e.target.dataset;
    setNewUser( prevNewUser => {
      return { 
        ...prevNewUser, 
        [column]: e.target.value
      }
    });
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

  const clearTermIfEmpty = e => {
    if (!searchField.value) {
      setSearchQuery('');
      dispatch(toFirstPage());
    }
  }

  useEffect(() => {
    if (user) {
      if (!searchQuery) {
        dispatch(getUsersAdmin({ user, limit: entriesLimit, page: tablePage, sortColumn: sortOrder.column, sortOrder: sortOrder.order }));
      } else {
        console.log('works');
      }
    }
  }, [dispatch, user, entriesLimit, tablePage, sortOrder, searchQuery]);

  return (
    <div className="access-management-div">
      <h2 className='title'>User Management</h2>
      <p className="show-entries">
        Show 
        <select name="entries" id="entries-select" onChange={limitChangeHandler}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        entries
      </p>
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
      <table className='management-table'>
        <tbody>
          <tr>
            <th data-value='firstName' onClick={handleSort}>
              First Name
              { sortOrder.column === 'firstName' && getSortImg() }
            </th>
            <th data-value='lastName' onClick={handleSort}>
              Last Name
              { sortOrder.column === 'lastName' && getSortImg() }  
            </th>
            <th data-value='emailAddress' onClick={handleSort}>
              E-mail
              { sortOrder.column === 'emailAddress' && getSortImg() }  
            </th>
            <th data-value='accessLevel' onClick={handleSort}>
              Access Level
              { sortOrder.column === 'accessLevel' && getSortImg() }  
            </th>
            <th data-value='createdAt' onClick={handleSort}>
              Created
              { sortOrder.column === 'createdAt' && getSortImg() }  
            </th>
            <th data-value='updatedAt' onClick={handleSort}>
              Last Updated
              { sortOrder.column === 'updatedAt' && getSortImg() }  
            </th>
            <th>Actions</th>
          </tr>
          <tr>
            <td><input type="text" data-column='firstName' placeholder='First Name' onChange={inputChangeHandler}/></td>
            <td><input type="text" data-column='lastName' placeholder='Last Name' onChange={inputChangeHandler}/></td>
            <td><input type="text" data-column='emailAddress' placeholder='E-mail' onChange={inputChangeHandler}/></td>
            <td><input type="text" data-column='accessLevel' placeholder='Access Level' onChange={inputChangeHandler}/></td>
            <td></td>
            <td></td>
            <td>
              <div className="action-buttons">
                <button>
                  <img src="https://img.icons8.com/android/16/15458A/plus.png" alt='create button'/>
                </button>
              </div>
            </td>
          </tr>
          { users && users.entries.length > 0 && users.entries.map( (user, i) => 
              <tr key={i}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.emailAddress}</td>
                <td>{user.accessLevel}</td>
                <td>{`${user.createdAt.slice(0, 10)} ${user.createdAt.slice(11, 16)}`}</td>
                <td>{`${user.updatedAt.slice(0, 10)} ${user.updatedAt.slice(11, 16)}`}</td>
                <td>
                  <div className="action-buttons">
                    <button>
                      <img src="https://img.icons8.com/material-outlined/16/15458A/visible--v1.png" alt='view button' />
                    </button>
                    <button>
                      <img src="https://img.icons8.com/material-outlined/16/15458A/pencil--v1.png" alt='edit button'/>
                    </button>
                    <button>
                      <img src="https://img.icons8.com/ios-filled/16/15458A/menu-2.png" alt='more button'/>
                    </button>
                  </div>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      <p className='entries-count'>{`Showing ${users.rangeStart} to ${users.rangeEnd} of ${users.total} entries`}</p>
      <PaginationBar use='admin' />
    </div>
  )
}

export default UserManagement
