import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import InfoModule from '../infoModule/InfoModule'
import Feed from '../feed/Feed'
import RecommendModule from '../recommendModule/RecommendModule'
import {
  selectAuthenticatedUser,
  selectLoggedIn,
} from '../user/userAccManage/userAccSlice';
import { selectIsMobile } from '../../app/screenWidthSlice'

const MainPage = props => {
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const isMobile = useSelector(selectIsMobile);
  const loggedIn = useSelector(selectLoggedIn);

  return (
    <div className='main-page-content'>
      { !isMobile && <RecommendModule />}
      { loggedIn && !isMobile ? <InfoModule user={authenticatedUser} /> :<Fragment /> }
      <Feed />
    </div>
  )
}

export default MainPage

