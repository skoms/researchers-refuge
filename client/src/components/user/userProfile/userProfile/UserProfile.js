import React from 'react'
import { useParams } from 'react-router';
import UserProfileFeed from '../userProfileFeed/UserProfileFeed';
//TODO - change out temporary data with data gotten from the server

const UserProfile = () => {
  const { id } = useParams();
  return (
    <div className='user-profile-page'>
      <UserProfileFeed 
        id={id}
        owner={false}
      />
    </div>
  )
}

export default UserProfile
