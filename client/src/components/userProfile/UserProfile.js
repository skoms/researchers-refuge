import React from 'react'

const UserProfile = () => {
  return (
    <div className='user-profile-page'>
      <div className="user-profile-div">
        <div className="user-profile-info-header">
        <div className="header-img-div">
          <img src="https://placeimg.com/1000/150/tech" alt="header"  className="header-img"/>
          <img src="https://placeimg.com/120/120/people" alt="profilepic" className="profile-pic" />
          <button className='button-primary'>Follow</button>
        </div>
          
          <div className="name-and-occupation">
            <h2 className="full-name">Kari Nordmann</h2>
            <p className="occupation">Unemployed</p>
          </div>
          <div className="stats">
            <div className="stat">
              <p className="title">Most active field:</p>
              <p className="data">n</p>
            </div>
            <div className="stat">
              <p className="title">Articles:</p>
              <p className="data">n</p>
            </div>
            <div className="stat">
              <p className="title">Credits:</p>
              <p className="data">n</p>
            </div>
            <div className="stat">
              <p className="title">Followers:</p>
              <p className="data">n</p>
            </div>
            <div className="stat">
              <p className="title">Following:</p>
              <p className="data">n</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
