import React from 'react'

const ResultRecUser = ({ user }) => {
  return (
    <div key={user.id} className="rec-user">
      <a href={`/users/${user.id}`} className="profile-pic" ><img src={user.imgURL} alt="profilepic" /></a>
      <a href={`/users/${user.id}`} className="full-name"><p>{`${user.firstName} ${user.lastName}`}</p></a>
      <p className="occupation">{user.occupation}</p>
      <div className="buttons">
        <button className='button-primary'>Follow</button>
        <button className='button-secondary'>View Profile</button>
      </div>
    </div>
  )
}

export default ResultRecUser
