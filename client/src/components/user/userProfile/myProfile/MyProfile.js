import React from 'react'
import RecPeople from '../../../recPeople/RecPeople'

import MyProfileFeed from '../myProfileFeed/MyProfileFeed';

const MyProfile = () => {
  return (
    <div className='my-profile-page'>
      <MyProfileFeed />
      <RecPeople />
    </div>
  )
}

export default MyProfile
