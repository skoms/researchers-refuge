import React, { useEffect, useState } from 'react'
import styles from './Feed.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedArticles, selectFilter, selectTopic } from './feedSlice'
import MenuBar from '../menuBar/MenuBar'
import ArticleCards from '../article/articleCards/ArticleCards'
import Loading from '../loading/Loading'
import { selectAuthenticatedUser } from '../user/userAccManage/userAccSlice'
import { selectPage } from '../paginationBar/paginationBarSlice'

const Feed = () => {
  const [didLoad, setDidLoad] = useState(false)
  const authenticatedUser = useSelector(selectAuthenticatedUser)
  const filter = useSelector(selectFilter)
  const topic = useSelector(selectTopic)
  const page = useSelector(selectPage)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      getFeedArticles({ filter, topic, user: authenticatedUser || null, page }),
    )
    if (!didLoad) {
      setDidLoad(true)
    }
  }, [didLoad, dispatch, filter, topic, authenticatedUser, page])

  return (
    <div className={styles.container} data-testid="feed-component">
      <MenuBar />
      {didLoad ? <ArticleCards type="feed" /> : <Loading />}
    </div>
  )
}

export default Feed
