import { useEffect } from 'react'
import styles from '../Management.module.css'
import { useSelector, useDispatch } from 'react-redux'
import PaginationBar from '../../../paginationBar/PaginationBar'
import { selectPage } from '../../../paginationBar/paginationBarSlice'
import { selectAuthenticatedUser } from '../../../user/userAccManage/userAccSlice'
import {
  selectCategories,
  selectEntriesLimit,
  selectSearchQuery,
  selectSortOrder,
  getCategoriesAdmin,
  getCategoriesByQueryAdmin,
} from '../../adminPanelSlice'
import EntriesSelect from '../entriesSelect/EntriesSelect'
import ManagementTable from '../managementTable/ManagementTable'
import TableSearch from '../tableSearch/TableSearch'
import EntriesShown from '../entriesShown/EntriesShown'

const CategoryManagement = () => {
  const user = useSelector(selectAuthenticatedUser)
  const dispatch = useDispatch()
  const tablePage = useSelector(selectPage)
  const entriesLimit = useSelector(selectEntriesLimit)
  const searchQuery = useSelector(selectSearchQuery)
  const sortOrder = useSelector(selectSortOrder)
  const categories = useSelector(selectCategories)

  useEffect(() => {
    if (user) {
      if (!searchQuery) {
        dispatch(
          getCategoriesAdmin({
            user,
            limit: entriesLimit,
            page: tablePage,
            sortColumn: sortOrder.column,
            sortOrder: sortOrder.order,
          }),
        )
      } else {
        dispatch(
          getCategoriesByQueryAdmin({
            user,
            query: searchQuery,
            limit: entriesLimit,
            page: tablePage,
            sortColumn: sortOrder.column,
            sortOrder: sortOrder.order,
          }),
        )
      }
    }
  }, [dispatch, user, entriesLimit, tablePage, sortOrder, searchQuery])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Category Management</h2>
      <EntriesSelect />
      <TableSearch />
      <ManagementTable data={categories} />
      <EntriesShown data={categories} />
      <PaginationBar use="admin" />
    </div>
  )
}

export default CategoryManagement
