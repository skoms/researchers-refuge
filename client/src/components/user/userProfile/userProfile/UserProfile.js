import React from 'react'

import UserProfileFeed from '../userProfileFeed/UserProfileFeed';
//TODO - change out temporary data with data gotten from the server

const UserProfile = () => {
  const temporaryUser = {
    firstName: 'Temp',
    lastName: 'User',
    occupation: 'Tester',
    mostActiveField: 'Testing',
    articles: 1,
    credits: 2,
    followers: [1],
    following: [1,2],
    imgURL: "https://img.icons8.com/ios-glyphs/120/38B6FF/robot-2--v1.png"
  };
  return (
    <div className='user-profile-page'>
      <UserProfileFeed 
        owner={false}
        user={temporaryUser}
      />
    </div>
  )
}

export default UserProfile
