import React from 'react'

const InfoModule = props => {
  const {
    firstName,
    lastName,
    occupation,
    bio,
    mostActiveField,
    articles,
    credits,
    followers,
    following,
    imgURL,
    accessLevel
  } = props.user;

  return (
    <div className='info-mod'>
      <img alt='your profile'
        src={ imgURL || "https://img.icons8.com/ios-glyphs/75/ffffff/user--v1.png" }
        className={ imgURL ? '' : 'placeholder' } 
      />
      <span className="full-name">
        <p className='full-name'>{ `${firstName} ${lastName}` }</p>
        {accessLevel === 'admin' ? 
          <img src="https://img.icons8.com/ios-glyphs/16/38B6FF/microsoft-admin--v2.png" alt='admin icon'/> : ''}
      </span>
      <p className='occupation'>{occupation}</p>
      <p className="bio">{bio}</p>
      <table>
        <tbody>
          <tr>
            <th>Active in:</th>
            <td>{ mostActiveField || '' }</td>
          </tr>
          <tr>
            <th>Articles:</th>
            <td>{ articles || 0 }</td>
          </tr>
          <tr>
            <th>Credits:</th>
            <td>{ credits || 0 }</td>
          </tr>
          <tr>
            <th>Followers:</th>
            <td>{ typeof followers === 'object' ? followers.length : 0 }</td>
          </tr>
          <tr>
            <th>Following:</th>
            <td>{ typeof following === 'object' ? following.length : 0 }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default InfoModule
