import React from 'react'

import tempUsers from '../../data/people';

const RecPeople = () => {
  return (
    <div className='rec-ppl'>
      <h2 className="title">People you may know</h2>
      {
        tempUsers.map( user => (
          <div className="rec-user">
            <img src={user.imgURL} alt="profilepic" className="profile-pic" />
            <p className="full-name">{user.name}</p>
            <p className="occupation">{user.occupation}</p>
            <a href={`/users/${user.UserId}`}><button className='button-primary'>Follow</button></a>
          </div>
        ))
      }
    </div>
  )
}

export default RecPeople
