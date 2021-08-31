import React from 'react'
import { useSelector, useEffect } from 'react-redux'
import { selectAuthenticatedUser } from '../user/userAccManage/userAccSlice'

const RecommendModule = () => {
  const user = useSelector(selectAuthenticatedUser);

  return user !== null && (
    <div className='rec-mod'>
      <table className='table-spacing'>
        <tbody>
          <tr>
            <th>Recommended Topics</th>
          </tr>
          <tr>
            <td>Recommendation</td>
          </tr>
          <tr>
            <td>Recommendation</td>
          </tr>
          <tr>
            <td>Recommendation</td>
          </tr>
        </tbody>
      </table>
      <table className='table-spacing'>
        <tbody>
          <tr>
            <th>Recommended Articles</th>
          </tr>
          <tr>
            <td>Recommendation</td>
          </tr>
          <tr>
            <td>Recommendation</td>
          </tr>
          <tr>
            <td>Recommendation</td>
          </tr>
        </tbody>
      </table>
      <table className='table-spacing'>
        <tbody>
          <tr>
            <th>Recommended Researchers</th>
          </tr>
          <tr>
            <td>Recommendation</td>
          </tr>
          <tr>
            <td>Recommendation</td>
          </tr>
          <tr>
            <td>Recommendation</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default RecommendModule
