import React from 'react'

import UserProfileFeed from '../userProfileFeed/UserProfileFeed';
//TODO - add dynamic data to all (name, occupation, stats etc)

const UserProfile = () => {
  return (
    <div className='user-profile-page'>
      <UserProfileFeed 
        owner={false}
      />
    </div>
  )
}

export default UserProfile
