import React from 'react'
import RecPeople from '../../../recPeople/RecPeople'

import UserProfileFeed from '../userProfileFeed/UserProfileFeed';

const MyProfile = () => {
  return (
    <div className='my-profile-page'>
      <UserProfileFeed 
        owner={true}
      />
      <RecPeople />
    </div>
  )
}

export default MyProfile
