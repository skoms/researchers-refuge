import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaginationBar from "../../paginationBar/PaginationBar";
import { selectPage } from "../../paginationBar/paginationBarSlice";
import { selectEntriesLimit, selectSearchQuery, selectSortOrder, getReportsAdmin, getReportsByQueryAdmin, selectReports } from "../adminPanelSlice";
import { selectAuthenticatedUser } from "../../user/userAccManage/userAccSlice";
import EntriesSelect from "./subcomponents/EntriesSelect";
import TableSearch from "./subcomponents/TableSearch";
import { ManagementTable } from "./subcomponents/ManagementTable";

const ReportCenter = () => {
  const columns = [
    { column: 'title', name: 'Title', input: true },
    { column: 'description', name: 'Description', input: true },
    { column: 'userId', name: 'Sender', input: false },
    { column: 'createdAt', name: 'Created', input: false },
    { column: 'updatedAt', name: 'Last Updated', input: false }
  ];
  const user = useSelector(selectAuthenticatedUser);
  const dispatch = useDispatch();
  const tablePage = useSelector(selectPage);
  const entriesLimit = useSelector(selectEntriesLimit);
  const searchQuery = useSelector(selectSearchQuery);
  const sortOrder = useSelector(selectSortOrder);
  const reports = useSelector(selectReports);
  const [statusFilter, setStatusFilter] = useState('Open');
  
  const handleStatusFilter = e => {
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
  }

  useEffect(() => {
    if (user) {
      if (!searchQuery) {
        dispatch(getReportsAdmin({ user, status: statusFilter.toLowerCase(), limit: entriesLimit, page: tablePage, sortColumn: sortOrder.column, sortOrder: sortOrder.order }));
      } else {
        dispatch(getReportsByQueryAdmin({ user, status: statusFilter.toLowerCase(), query: searchQuery, limit: entriesLimit, page: tablePage, sortColumn: sortOrder.column, sortOrder: sortOrder.order }));
      }
    }
  }, [dispatch, user, entriesLimit, tablePage, sortOrder, searchQuery, statusFilter]);


  return (
    <div className="access-management-div">
      <h2 className='title'>Topic Management</h2>
      <EntriesSelect />
      <TableSearch />
      <div className="status-filter" onClick={handleStatusFilter}>
        <button data-status-filter-button className='open-button selected'>Open</button>
        <button data-status-filter-button className='resolved-button'>Resolved</button>
        <button data-status-filter-button className='rejected-button'>Rejected</button>
      </div>
      <ManagementTable 
        columns={columns}
        data={reports}
      />
      <p className='entries-count'>{`Showing ${reports.rangeStart} to ${reports.rangeEnd} of ${reports.total} entries`}</p>
      <PaginationBar use='admin' />
    </div>
  )
}

export default ReportCenter
