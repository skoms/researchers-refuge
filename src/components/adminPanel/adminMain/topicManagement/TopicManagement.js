import { useEffect } from "react";
import styles from '../Management.module.css';
import { useSelector, useDispatch } from "react-redux";
import PaginationBar from "../../../paginationBar/PaginationBar";
import { selectPage } from "../../../paginationBar/paginationBarSlice";
import { selectEntriesLimit, selectSearchQuery, selectTopics, selectSortOrder, getTopicsAdmin, getTopicsByQueryAdmin } from "../../adminPanelSlice";
import { selectAuthenticatedUser } from "../../../user/userAccManage/userAccSlice";
import EntriesSelect from "../entriesSelect/EntriesSelect";
import TableSearch from "../tableSearch/TableSearch";
import ManagementTable from "../managementTable/ManagementTable";

const TopicManagement = () => {
  const user = useSelector(selectAuthenticatedUser);
  const dispatch = useDispatch();
  const tablePage = useSelector(selectPage);
  const entriesLimit = useSelector(selectEntriesLimit);
  const searchQuery = useSelector(selectSearchQuery);
  const sortOrder = useSelector(selectSortOrder);
  const topics = useSelector(selectTopics);

  useEffect(() => {
    if (user) {
      if (!searchQuery) {
        dispatch(getTopicsAdmin({ user, limit: entriesLimit, page: tablePage, sortColumn: sortOrder.column, sortOrder: sortOrder.order }));
      } else {
        dispatch(getTopicsByQueryAdmin({ user, query: searchQuery, limit: entriesLimit, page: tablePage, sortColumn: sortOrder.column, sortOrder: sortOrder.order }));
      }
    }
  }, [dispatch, user, entriesLimit, tablePage, sortOrder, searchQuery]);


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Topic Management</h2>
      <EntriesSelect />
      <TableSearch />
      <ManagementTable 
        data={topics}
      />
      <p className={styles.entriesCount}>{`Showing ${topics.rangeStart} to ${topics.rangeEnd} of ${topics.total} entries`}</p>
      <PaginationBar use='admin' />
    </div>
  )
}

export default TopicManagement
