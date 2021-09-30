import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { selectAuthenticatedUser } from "../../user/userAccManage/userAccSlice";
import { getStatsAdmin, selectStats } from "../adminPanelSlice"

const Statistics = () => {
  const stats = useSelector(selectStats);
  const user = useSelector(selectAuthenticatedUser);
  const dispatch = useDispatch();
  const [didLoad, setDidLoad] = useState(false);

  useEffect(() => {
    if (!didLoad) {
      dispatch(getStatsAdmin(user));
      setDidLoad(true);
    }
  }, [didLoad, dispatch, user]);

  return (
    <div className="statistics-div">
      <h2 className='title'>Statistics</h2>
      <div className="table-div total">
        <h4>Total</h4>
        <table className='statistics-table'>
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
      <div className="table-div new">
        <h4>New (last 30 days)</h4>
        <table className='statistics-table'>
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
      <div className="table-div reports">
        <h4>Reports</h4>
        <table className='statistics-table'>
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
