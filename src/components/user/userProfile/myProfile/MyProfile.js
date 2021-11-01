import React from 'react'
import styles from './MyProfile.module.css'
import { useSelector } from 'react-redux'
import { selectIsMobile } from '../../../../app/screenWidthSlice'
import RecPeople from '../../../recPeople/RecPeople'

import MyProfileFeed from '../myProfileFeed/MyProfileFeed'

const MyProfile = () => {
  const isMobile = useSelector(selectIsMobile)
  return (
    <div data-testid="my-profile-component" className={styles.container}>
      <MyProfileFeed />
      {!isMobile && <RecPeople />}
    </div>
  )
}

export default MyProfile
