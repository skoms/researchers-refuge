import React from 'react'
import { useSelector } from 'react-redux';
import RecPeople from '../../../recPeople/RecPeople'

import UserProfileFeed from '../userProfileFeed/UserProfileFeed';
import { Context } from '../../../../Context'
import { selectAuthenticatedUser } from '../user/userAccManage/userAccSlice';

const MyProfile = () => {
  const user = useSelector(selectAuthenticatedUser);
  return (
    <div className='my-profile-page'>
      <UserProfileFeed 
        owner={true}
        user={user}
      />
      <RecPeople />
    </div>
  )
}

export default MyProfile
