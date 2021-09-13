import React from 'react'
import { useSelector } from 'react-redux';
import { selectIsMobile } from '../../../../app/screenWidthSlice';
import RecPeople from '../../../recPeople/RecPeople'

import MyProfileFeed from '../myProfileFeed/MyProfileFeed';

const MyProfile = () => {
  const isMobile = useSelector(selectIsMobile);
  return (
    <div className='my-profile-page'>
      <MyProfileFeed />
      { !isMobile && <RecPeople />}
    </div>
  )
}

export default MyProfile
