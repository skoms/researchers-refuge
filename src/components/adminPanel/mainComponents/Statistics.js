const Statistics = () => {
  return (
    <div className="statistics-div">
      <h2 className='title'>Statistics</h2>
      <div className="table-div total">
        <h4>Total</h4>
        <table className='statistics-table'>
            <tbody>
            <tr>
              <th>Users</th>
              <td>0</td>
            </tr>
            <tr>
              <th>Articles</th>
              <td>0</td>
            </tr>
            <tr>
              <th>Admins</th>
              <td>0</td>
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
              <td>0</td>
            </tr>
            <tr>
              <th>Articles</th>
              <td>0</td>
            </tr>
            <tr>
              <th>Admins</th>
              <td>0</td>
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
              <td>0</td>
            </tr>
            <tr>
              <th>Resolved</th>
              <td>0</td>
            </tr>
            <tr>
              <th>Rejected</th>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Statistics
