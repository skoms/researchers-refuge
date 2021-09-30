import { useState } from "react";
import { useSelector } from "react-redux";
import PaginationBar from "../../paginationBar/PaginationBar";
import { selectPage } from '../../paginationBar/paginationBarSlice';

const UserManagement = () => {
  const tempUsers = [
    {
      firstName: 'test',
      lastName: 'user',
      emailAddress: 'test@user.com',
      accessLevel: 'none',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      firstName: 'test',
      lastName: 'user',
      emailAddress: 'test@user.com',
      accessLevel: 'none',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      firstName: 'test',
      lastName: 'user',
      emailAddress: 'test@user.com',
      accessLevel: 'none',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      firstName: 'test',
      lastName: 'user',
      emailAddress: 'test@user.com',
      accessLevel: 'none',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
  ];
  const tablePage = useSelector(selectPage);
  const [entriesLimit, setEntriesLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState({ column: null, order: null });

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

  const searchChangeHandler = e => {
    setSearchQuery(e.target.value);
  }

  const submit = () => {

  }

  return (
    <div className="access-management-div">
      <h2 className='title'>User Management</h2>
      <p className="show-entries">
        Show 
        <select name="entries" id="entries-select">
          <option value="10">10</option>
          <option value="20">25</option>
          <option value="50">50</option>
        </select>
        entries
      </p>
      <div className="table-search">
        <form onSubmit={submit} className='table-search-form'>
          <button className="clear-search">
            <img src="https://img.icons8.com/fluency-systems-filled/18/64B5F7/xbox-x.png" alt='clear search button'/>
          </button>
          <input type="text" className='table-search-field' placeholder='Search...' onChange={searchChangeHandler} value={searchQuery} />
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
            <td><input type="text" placeholder='First Name' /></td>
            <td><input type="text" placeholder='Last Name' /></td>
            <td><input type="text" placeholder='E-mail' /></td>
            <td><input type="text" placeholder='Access Level' /></td>
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
          { tempUsers.map( (user, i) => 
              <tr key={i}>
                <td>{user.firstName + i}</td>
                <td>{user.lastName}</td>
                <td>{user.emailAddress}</td>
                <td>{user.accessLevel}</td>
                <td>{user.createdAt}</td>
                <td>{user.updatedAt}</td>
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
      <p className='entries-count'>{`Showing x to x of x entries`}</p>
      <PaginationBar use='admin' />
    </div>
  )
}

export default UserManagement
