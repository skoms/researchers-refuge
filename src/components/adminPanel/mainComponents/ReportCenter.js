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
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Sender</th>
            <th>Created</th>
            <th>Last Updated</th>
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
