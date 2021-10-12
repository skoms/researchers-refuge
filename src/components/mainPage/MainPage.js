import React, { Fragment } from 'react'
import styles from './MainPage.module.css';
import { useSelector } from 'react-redux'
import InfoModule from '../infoModule/InfoModule'
import Feed from '../feed/Feed'
import RecommendModule from '../recommendModule/RecommendModule'
import {
  selectAuthenticatedUser,
  selectLoggedIn,
} from '../user/userAccManage/userAccSlice';
import { selectIsMobile } from '../../app/screenWidthSlice'

const MainPage = () => {
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const isMobile = useSelector(selectIsMobile);
  const loggedIn = useSelector(selectLoggedIn);

  return (
    <div className={styles.container}>
      { !isMobile && <RecommendModule />}
      { loggedIn && !isMobile ? <InfoModule user={authenticatedUser} /> :<Fragment /> }
      <Feed />
    </div>
  )
}

export default MainPage

