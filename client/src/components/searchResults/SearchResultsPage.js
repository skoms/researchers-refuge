import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import InfoModule from '../infoModule/InfoModule'
import RecommendModule from '../recommendModule/RecommendModule'
import {
  selectAuthenticatedUser,
  selectLoggedIn,
} from '../user/userAccManage/userAccSlice';
import SearchResultsFeed from './SearchResultsFeed'
import { selectIsMobile } from '../../app/screenWidthSlice';

const SearchResultsPage = props => {
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const loggedIn = useSelector(selectLoggedIn);
  const isMobile = useSelector(selectIsMobile);

  return (
    <div className='results-page-content'>
      { !isMobile && loggedIn ? <InfoModule user={authenticatedUser} /> :<Fragment /> }
      <SearchResultsFeed />
      { !isMobile && <RecommendModule />}
    </div>
  )
}

export default SearchResultsPage