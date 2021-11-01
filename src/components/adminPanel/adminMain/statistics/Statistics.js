import { useState, useEffect } from 'react'
import styles from './Statistics.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuthenticatedUser } from '../../../user/userAccManage/userAccSlice'
import { getStatsAdmin, selectStats } from '../../adminPanelSlice'

const Statistics = () => {
  const stats = useSelector(selectStats)
  const user = useSelector(selectAuthenticatedUser)
  const dispatch = useDispatch()
  const [didLoad, setDidLoad] = useState(false)

  useEffect(() => {
    if (!didLoad) {
      dispatch(getStatsAdmin(user))
      setDidLoad(true)
    }
  }, [didLoad, dispatch, user])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Statistics</h2>
      <div className={`${styles.tableContainer} ${styles.total}`}>
        <h4 className={styles.tableTitle}>Total</h4>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Users</th>
              <td>{stats.total.users}</td>
            </tr>
            <tr>
              <th>Articles</th>
              <td>{stats.total.articles}</td>
            </tr>
            <tr>
              <th>Admins</th>
              <td>{stats.total.admins}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={`${styles.tableContainer} ${styles.new}`}>
        <h4 className={styles.tableTitle}>New (last 30 days)</h4>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Users</th>
              <td>{stats.new.users}</td>
            </tr>
            <tr>
              <th>Articles</th>
              <td>{stats.new.articles}</td>
            </tr>
            <tr>
              <th>Admins</th>
              <td>{stats.new.admins}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={`${styles.tableContainer} ${styles.reports}`}>
        <h4 className={styles.tableTitle}>Reports</h4>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Open</th>
              <td>{stats.reports.open}</td>
            </tr>
            <tr>
              <th>Resolved</th>
              <td>{stats.reports.resolved}</td>
            </tr>
            <tr>
              <th>Rejected</th>
              <td>{stats.reports.rejected}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Statistics
