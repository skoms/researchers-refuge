import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PaginationBar from "../../paginationBar/PaginationBar";
import { selectPage } from '../../paginationBar/paginationBarSlice';

const ReportCenter = () => {
  const tempReports = [
    {
      id: 1,
      title: 'test issue title',
      description: 'There was some issue with testing',
      sender: 'test user',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      id: 1,
      title: 'test issue title',
      description: 'There was some issue with testing',
      sender: 'test user',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      id: 1,
      title: 'test issue title',
      description: 'There was some issue with testing',
      sender: 'test user',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      id: 1,
      title: 'test issue title',
      description: 'There was some issue with testing',
      sender: 'test user',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      id: 1,
      title: 'test issue title',
      description: 'There was some issue with testing',
      sender: 'test user',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      id: 1,
      title: 'test issue title',
      description: 'There was some issue with testing',
      sender: 'test user',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      id: 1,
      title: 'test issue title',
      description: 'There was some issue with testing',
      sender: 'test user',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
  ];
  const tablePage = useSelector(selectPage);
  const [statusFilter, setStatusFilter] = useState('Open');
  const [entriesLimit, setEntriesLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [didLoad, setDidLoad] = useState(false);
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

  useEffect(() => {
    const addDropdownEventHandler = () => {
      window.addEventListener('click', e => {
        const isFilterButton = e.target.matches('[data-status-filter-button]');
  
        if (!isFilterButton) return;

        if (isFilterButton) {
          const table =  document.querySelector('.management-table');

          table.classList.contains('open') && table.classList.remove('open');
          table.classList.contains('resolved') && table.classList.remove('resolved');
          table.classList.contains('rejected') && table.classList.remove('rejected');
          document.querySelector('[data-status-filter-button].selected').classList.remove('selected');

          e.target.classList.add('selected');
          table.classList.add(e.target.innerHTML.toLocaleLowerCase());
          setStatusFilter(e.target.innerHTML);
        }
      });
    }
    if (!didLoad) {
      addDropdownEventHandler();
      setDidLoad(true);
    }
  }, [didLoad, statusFilter]);

  const searchChangeHandler = e => {
    setSearchQuery(e.target.value);
  }

  const submit = () => {

  }

  return (
    <div className="report-center-div">
      <h2 className='title'>Report Center</h2>
      <p className="show-entries">
        Show 
        <select name="entries" id="entries-select">
          <option value="10">10</option>
          <option value="20">25</option>
          <option value="50">50</option>
        </select>
        entries
      </p>
      <div className="status-filter">
        <button data-status-filter-button className='open-button selected'>Open</button>
        <button data-status-filter-button className='resolved-button'>Resolved</button>
        <button data-status-filter-button className='rejected-button'>Rejected</button>
      </div>
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
            <th data-value='id' onClick={handleSort}>
              Id
              { sortOrder.column === 'id' && getSortImg() }
            </th>
            <th data-value='title' onClick={handleSort}>
              Title
              { sortOrder.column === 'title' && getSortImg() }
            </th>
            <th data-value='description' onClick={handleSort}>
              Description
              { sortOrder.column === 'description' && getSortImg() }
            </th>
            <th data-value='userId' onClick={handleSort}>
              Sender
              { sortOrder.column === 'userId' && getSortImg() }
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
          { tempReports.map( (report, i) => 
              <tr key={i}>
                <td>{report.id + i}</td>
                <td>{report.title}</td>
                <td>{report.description}</td>
                <td>{report.sender}</td>
                <td>{report.createdAt}</td>
                <td>{report.updatedAt}</td>
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

export default ReportCenter
