import { useEffect } from 'react'
import styles from '../Management.module.css'
import { useSelector, useDispatch } from 'react-redux'
import PaginationBar from '../../../paginationBar/PaginationBar'
import { selectPage } from '../../../paginationBar/paginationBarSlice'
import ManagementTable from '../managementTable/ManagementTable'
import { selectAuthenticatedUser } from '../../../user/userAccManage/userAccSlice'
import TableSearch from '../tableSearch/TableSearch'
import EntriesSelect from '../entriesSelect/EntriesSelect'
import {
  getArticlesAdmin,
  getArticlesByQueryAdmin,
  selectArticles,
  selectSortOrder,
  selectEntriesLimit,
  selectSearchQuery,
} from '../../adminPanelSlice'
import EntriesShown from '../entriesShown/EntriesShown'

const ArticleManagement = () => {
  const user = useSelector(selectAuthenticatedUser)
  const dispatch = useDispatch()
  const tablePage = useSelector(selectPage)
  const entriesLimit = useSelector(selectEntriesLimit)
  const searchQuery = useSelector(selectSearchQuery)
  const sortOrder = useSelector(selectSortOrder)
  const articles = useSelector(selectArticles)

  useEffect(() => {
    if (user) {
      if (!searchQuery) {
        dispatch(
          getArticlesAdmin({
            user,
            limit: entriesLimit,
            page: tablePage,
            sortColumn: sortOrder.column,
            sortOrder: sortOrder.order,
          }),
        )
      } else {
        dispatch(
          getArticlesByQueryAdmin({
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
      <h2 className={styles.title}>Article Management</h2>
      <EntriesSelect />
      <TableSearch />
      <ManagementTable data={articles} />
      <EntriesShown data={articles} />
      <PaginationBar use="admin" />
    </div>
  )
}

export default ArticleManagement
