import React from 'react'
import { useSelector } from 'react-redux';
import RecPeople from '../../../recPeople/RecPeople'

import UserProfileFeed from '../userProfileFeed/UserProfileFeed';
import { selectAuthenticatedUser } from '../../userAccManage/userAccSlice';

const MyProfile = () => {
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  return (
    <div className='my-profile-page'>
      <UserProfileFeed 
        owner={true}
        user={authenticatedUser}
      />
      <RecPeople />
    </div>
  )
}

export default MyProfile
