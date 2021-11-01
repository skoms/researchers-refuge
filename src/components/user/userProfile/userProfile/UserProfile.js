import React from 'react'
import styles from './UserProfile.module.css'
import { useParams } from 'react-router'
import UserProfileFeed from '../userProfileFeed/UserProfileFeed'
//TODO - change out temporary data with data gotten from the server

const UserProfile = () => {
  const { id } = useParams()
  return (
    <div data-testid="user-profile-component" className={styles.container}>
      <UserProfileFeed id={id} />
    </div>
  )
}

export default UserProfile
