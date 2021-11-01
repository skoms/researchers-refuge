import React from 'react'
import styles from './SearchResultsPage.module.css'
import { useSelector } from 'react-redux'
import InfoModule from '../infoModule/InfoModule'
import RecommendModule from '../recommendModule/RecommendModule'
import {
  selectAuthenticatedUser,
  selectLoggedIn,
} from '../user/userAccManage/userAccSlice'
import SearchResultsFeed from './SearchResultsFeed'
import { selectIsMobile } from '../../app/screenWidthSlice'

const SearchResultsPage = () => {
  const authenticatedUser = useSelector(selectAuthenticatedUser)
  const loggedIn = useSelector(selectLoggedIn)
  const isMobile = useSelector(selectIsMobile)

  return (
    <div className={styles.container}>
      {!isMobile && loggedIn && <InfoModule user={authenticatedUser} />}
      <SearchResultsFeed />
      {!isMobile && <RecommendModule />}
    </div>
  )
}

export default SearchResultsPage
