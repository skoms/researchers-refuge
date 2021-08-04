import React from 'react'

const InfoModule = props => {
  return (
    <div className='info-mod'>
      <img src="https://via.placeholder.com/75" alt="placeholder" />
      <p className='full-name'>FirstName LastName</p>
      <p className='occupation'>Profession / Occupation</p>
      <p className="bio">Loves to be placeholders for ambitious projects!</p>
      <table>
        <tbody>
          <tr>
            <th>Most Active in:</th>
            <td>n</td>
          </tr>
          <tr>
            <th>Articles Written:</th>
            <td>n</td>
          </tr>
          <tr>
            <th>Credits Accumulated:</th>
            <td>n</td>
          </tr>
          <tr>
            <th>Followers:</th>
            <td>n</td>
          </tr>
          <tr>
            <th>Following:</th>
            <td>n</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default InfoModule
