import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaginationBar from "../../../paginationBar/PaginationBar";
import { selectPage } from "../../../paginationBar/paginationBarSlice";
import { selectEntriesLimit, selectSearchQuery, selectSortOrder, getReportsAdmin, getReportsByQueryAdmin, selectReports } from "../../adminPanelSlice";
import { selectAuthenticatedUser } from "../../../user/userAccManage/userAccSlice";
import EntriesSelect from "../entriesSelect/EntriesSelect";
import TableSearch from "../tableSearch/TableSearch";
import ManagementTable from "../managementTable/ManagementTable";
import StatusFilter from "../statusFilter/StatusFilter";

const ReportCenter = () => {
  const user = useSelector(selectAuthenticatedUser);
  const dispatch = useDispatch();
  const tablePage = useSelector(selectPage);
  const entriesLimit = useSelector(selectEntriesLimit);
  const searchQuery = useSelector(selectSearchQuery);
  const sortOrder = useSelector(selectSortOrder);
  const reports = useSelector(selectReports);
  const [statusFilter, setStatusFilter] = useState('open');

  useEffect(() => {
    if (user) {
      if (!searchQuery) {
        dispatch(getReportsAdmin({ user, status: statusFilter, limit: entriesLimit, page: tablePage, sortColumn: sortOrder.column, sortOrder: sortOrder.order }));
      } else {
        dispatch(getReportsByQueryAdmin({ user, status: statusFilter, query: searchQuery, limit: entriesLimit, page: tablePage, sortColumn: sortOrder.column, sortOrder: sortOrder.order }));
      }
    }
  }, [dispatch, user, entriesLimit, tablePage, sortOrder, searchQuery, statusFilter]);


  return (
    <div className="access-management-div">
      <h2 className='title'>Topic Management</h2>
      <EntriesSelect />
      <TableSearch />
      <StatusFilter setStatusFilter={setStatusFilter} />
      <ManagementTable 
        statusFilter={statusFilter}
        data={reports}
      />
      <p className='entries-count'>{`Showing ${reports.rangeStart} to ${reports.rangeEnd} of ${reports.total} entries`}</p>
      <PaginationBar use='admin' />
    </div>
  )
}

export default ReportCenter
