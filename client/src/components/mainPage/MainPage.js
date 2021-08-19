import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import InfoModule from '../infoModule/InfoModule'
import Feed from '../feed/Feed'
import RecommendModule from '../recommendModule/RecommendModule'
import {
  selectAuthenticatedUser,
  selectLoggedIn,
} from '../user/userAccManage/userAccSlice';

const MainPage = props => {
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const loggedIn = useSelector(selectLoggedIn);

  return (
    <div className='main-page-content'>
      { loggedIn ? <InfoModule user={authenticatedUser} /> :<Fragment /> }
      <Feed />
      <RecommendModule />
    </div>
  )
}

export default MainPage

