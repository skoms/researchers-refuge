import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaginationBar from "../../paginationBar/PaginationBar";
import { selectPage } from "../../paginationBar/paginationBarSlice";
import { selectAuthenticatedUser } from "../../user/userAccManage/userAccSlice";
import { selectCategories, selectEntriesLimit, selectSearchQuery, selectSortOrder, getCategoriesAdmin, getCategoriesByQueryAdmin } from "../adminPanelSlice";
import EntriesSelect from "./subcomponents/EntriesSelect";
import { ManagementTable } from "./subcomponents/ManagementTable";
import TableSearch from "./subcomponents/TableSearch";

const CategoryManagement = () => {
  const columns = [
    { column: 'name', name: 'Name', input: true },
    { column: 'createdAt', name: 'Created', input: false },
    { column: 'updatedAt', name: 'Last Updated', input: false }
  ];
  const user = useSelector(selectAuthenticatedUser);
  const dispatch = useDispatch();
  const tablePage = useSelector(selectPage);
  const entriesLimit = useSelector(selectEntriesLimit);
  const searchQuery = useSelector(selectSearchQuery);
  const sortOrder = useSelector(selectSortOrder);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    if (user) {
      if (!searchQuery) {
        dispatch(getCategoriesAdmin({ user, limit: entriesLimit, page: tablePage, sortColumn: sortOrder.column, sortOrder: sortOrder.order }));
      } else {
        dispatch(getCategoriesByQueryAdmin({ user, query: searchQuery, limit: entriesLimit, page: tablePage, sortColumn: sortOrder.column, sortOrder: sortOrder.order }));
      }
    }
  }, [dispatch, user, entriesLimit, tablePage, sortOrder, searchQuery]);


  return (
    <div className="access-management-div">
      <h2 className='title'>Category Management</h2>
      <EntriesSelect />
      <TableSearch />
      <ManagementTable 
        columns={columns}
        data={categories}
      />
      <p className='entries-count'>{`Showing ${categories.rangeStart} to ${categories.rangeEnd} of ${categories.total} entries`}</p>
      <PaginationBar use='admin' />
    </div>
  )
}

export default CategoryManagement
