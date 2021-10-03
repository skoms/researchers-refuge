import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaginationBar from "../../paginationBar/PaginationBar";
import { selectPage } from "../../paginationBar/paginationBarSlice";
import { selectEntriesLimit, selectSearchQuery, selectTopics, selectSortOrder, getTopicsAdmin, getTopicsByQueryAdmin } from "../adminPanelSlice";
import { selectAuthenticatedUser } from "../../user/userAccManage/userAccSlice";
import EntriesSelect from "./subcomponents/EntriesSelect";
import TableSearch from "./subcomponents/TableSearch";
import { ManagementTable } from "./subcomponents/ManagementTable";

const TopicManagement = () => {
  const tempTopics = [
    {
      name: 'test name',
      category: 'test category',
      relatedTags: 'test tags',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      name: 'test name',
      category: 'test category',
      relatedTags: 'test tags',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      name: 'test name',
      category: 'test category',
      relatedTags: 'test tags',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      name: 'test name',
      category: 'test category',
      relatedTags: 'test tags',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      name: 'test name',
      category: 'test category',
      relatedTags: 'test tags',
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
  ];
  const columns = [
    { column: 'name', name: 'Name', input: true },
    { column: 'categoryId', name: 'CategoryId', input: true },
    { column: 'relatedTags', name: 'Related Tags', input: true },
    { column: 'createdAt', name: 'Created', input: false },
    { column: 'updatedAt', name: 'Last Updated', input: false }
  ];
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
    <div className="access-management-div">
      <h2 className='title'>Topic Management</h2>
      <EntriesSelect />
      <TableSearch />
      <ManagementTable 
        columns={columns}
        data={topics}
      />
      <p className='entries-count'>{`Showing x to x of x entries`}</p>
      <PaginationBar use='admin' />
    </div>
  )
}

export default TopicManagement
