import React from 'react'

const UserProfile = () => {
  return (
    <div className='user-profile-page'>
      <div className="user-profile-div">
        <div className="user-profile-info-header">
          <img src="https://via.placeholder.com/1000x150" alt="header" className="header-img" />
          <img src="https://via.placeholder.com/120x120" alt="profilepic" className="profile-pic" />
          <button className='button-primary'>Follow</button>
          <div className="name-and-occupation">
            <h2 className="full-name">Kari Nordmann</h2>
            <p className="occupation">Unemployed</p>
          </div>
          <div className="stats">
            <p>Most active field: n</p>
            <p>Articles: n</p>
            <p>Credits: n</p>
            <p>Followers: n</p>
            <p>Following: n</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
