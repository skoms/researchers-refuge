import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import InfoModule from '../infoModule/InfoModule'
import RecommendModule from '../recommendModule/RecommendModule'
import {
  selectAuthenticatedUser,
  selectLoggedIn,
} from '../user/userAccManage/userAccSlice';
import SearchResultsFeed from './SearchResultsFeed'

const SearchResultsPage = props => {
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const loggedIn = useSelector(selectLoggedIn);

  return (
    <div className='results-page-content'>
      { loggedIn ? <InfoModule user={authenticatedUser} /> :<Fragment /> }
      <SearchResultsFeed />
      <RecommendModule />
    </div>
  )
}

export default SearchResultsPage