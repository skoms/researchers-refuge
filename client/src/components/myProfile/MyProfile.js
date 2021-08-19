import React, { useContext } from 'react'
import RecPeople from '../recPeople/RecPeople'

import UserProfileFeed from '../user/userProfile/userProfileFeed/UserProfileFeed';
import { Context } from '../../Context'

const MyProfile = () => {
  const context = useContext(Context);
  const user = context.authenticatedUser;
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
