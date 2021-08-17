import React from 'react'

const InfoModule = props => {
  const {
    firstName,
    lastName,
    occupation,
    mostActiveField,
    articles,
    credits,
    followers,
    following,
    imgURL
  } = props.user;

  return (
    <div className='info-mod'>
      <img alt='your profile'
        src={ imgURL || "https://img.icons8.com/ios-glyphs/75/ffffff/user--v1.png" }
        className={ imgURL ? '' : 'placeholder' } 
        height="75" width="75" 
      />
      <p className='full-name'>{`${firstName} ${lastName}`}</p>
      <p className='occupation'>{occupation}</p>
      <p className="bio">Loves to be placeholders for ambitious projects!</p>
      <table>
        <tbody>
          <tr>
            <th>Active in:</th>
            <td>{ mostActiveField || '' }</td>
          </tr>
          <tr>
            <th>Articles:</th>
            <td>{ articles }</td>
          </tr>
          <tr>
            <th>Credits:</th>
            <td>{ credits }</td>
          </tr>
          <tr>
            <th>Followers:</th>
            <td>{ followers.length }</td>
          </tr>
          <tr>
            <th>Following:</th>
            <td>{ following.length }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default InfoModule
