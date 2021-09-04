import React from 'react'
import RecPeople from '../../../recPeople/RecPeople'

import MyProfileFeed from '../myProfileFeed/MyProfileFeed';

const MyProfile = () => {
  const toggleEdit = () => {
    console.log('toggle');
  }
  return (
    <div className='my-profile-page'>
      <MyProfileFeed toggleEdit={toggleEdit} />
      <RecPeople />
    </div>
  )
}

export default MyProfile
