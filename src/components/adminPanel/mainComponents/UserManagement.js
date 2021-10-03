import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaginationBar from "../../paginationBar/PaginationBar";
import { selectPage } from '../../paginationBar/paginationBarSlice';
import { selectAuthenticatedUser } from "../../user/userAccManage/userAccSlice";
import { getUsersAdmin, getUsersByQueryAdmin, selectSortOrder, selectUsers, selectEntriesLimit, selectSearchQuery } from "../adminPanelSlice";
import EntriesSelect from "./subcomponents/EntriesSelect";
import { ManagementTable } from "./subcomponents/ManagementTable";
import TableSearch from "./subcomponents/TableSearch";

const UserManagement = () => {
  const users = useSelector(selectUsers);
  const user = useSelector(selectAuthenticatedUser);
  const dispatch = useDispatch();
  const tablePage = useSelector(selectPage);
  const searchQuery = useSelector(selectSearchQuery);
  const entriesLimit = useSelector(selectEntriesLimit);
  const sortOrder = useSelector(selectSortOrder);

  const columns = [
    { column: 'firstName', name: 'First Name', input: true },
    { column: 'lastName', name: 'Last Name', input: true },
    { column: 'emailAddress', name: 'E-mail', input: true },
    { column: 'accessLevel', name: 'Access Level', input: true },
    { column: 'createdAt', name: 'Created', input: false },
    { column: 'updatedAt', name: 'Last Updated', input: false }
  ];

  useEffect(() => {
    if (user) {
      if (!searchQuery) {
        dispatch(getUsersAdmin({ user, limit: entriesLimit, page: tablePage, sortColumn: sortOrder.column, sortOrder: sortOrder.order }));
      } else {
        dispatch(getUsersByQueryAdmin({ user, query: searchQuery, limit: entriesLimit, page: tablePage, sortColumn: sortOrder.column, sortOrder: sortOrder.order }));
      }
    }
  }, [dispatch, user, entriesLimit, tablePage, sortOrder, searchQuery]);

  return (
    <div className="access-management-div">
      <h2 className='title'>User Management</h2>
      <EntriesSelect />
      <TableSearch 
        searchQuery={searchQuery}
      />
      <ManagementTable 
        columns={columns}
        sortOrder={sortOrder}
        data={users}
      />
      <p className='entries-count'>{`Showing ${users.rangeStart} to ${users.rangeEnd} of ${users.total} entries`}</p>
      <PaginationBar use='admin' />
    </div>
  )
}

export default UserManagement
