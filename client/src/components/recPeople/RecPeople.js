import React from 'react'

import tempUsers from '../../data/people';

const RecPeople = () => {
  return (
    <div className='rec-ppl'>
      <h2 className="title">People you may know</h2>
      {
        tempUsers.map( user => (
          <div key={user.id} className="rec-user">
            <a href={`/users/${user.UserId}`} className="profile-pic" ><img src={user.imgURL} alt="profilepic" /></a>
            <a href={`/users/${user.UserId}`} className="full-name"><p>{`${user.firstName} ${user.lastName}`}</p></a>
            <p className="occupation">{user.occupation}</p>
            <button className='button-primary'>Follow</button>
          </div>
        )).slice(0,5)
      }
    </div>
  )
}

export default RecPeople
