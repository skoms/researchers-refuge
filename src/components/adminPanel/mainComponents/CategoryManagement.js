import { useState } from "react";
import { useSelector } from "react-redux";
import PaginationBar from "../../paginationBar/PaginationBar";
import { selectPage } from "../../paginationBar/paginationBarSlice";

const CategoryManagement = () => {
  const tempCategories = [
    {
      name: 'test name',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      name: 'test name',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      name: 'test name',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      name: 'test name',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      name: 'test name',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
  ];
  const tablePage = useSelector(selectPage);
  const [entriesLimit, setEntriesLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const searchChangeHandler = e => {
    setSearchQuery(e.target.value);
  }

  const submit = () => {

  }

  return (
    <div className="access-management-div">
      <h2 className='title'>Category Management</h2>
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
            <th>Name</th>
            <th>Created</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td><input type="text" placeholder='Name' /></td>
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
          { tempCategories.map( (category, i) => 
              <tr key={i}>
                <td>{category.name + i}</td>
                <td>{category.createdAt}</td>
                <td>{category.updatedAt}</td>
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

export default CategoryManagement
