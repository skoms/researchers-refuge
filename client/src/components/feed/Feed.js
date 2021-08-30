import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedArticles, selectFilter, selectTopic } from './feedSlice' 
import MenuBar from '../menuBar/MenuBar'
import ArticleCards from '../article/articleCards/ArticleCards'
import Loading from '../loading/Loading'
import { selectAuthenticatedUser } from '../user/userAccManage/userAccSlice'

const Feed = () => {
  const [didLoad, setDidLoad] = useState(false);
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const filter = useSelector(selectFilter);
  const topic = useSelector(selectTopic);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedArticles({filter, topic, user: authenticatedUser || null}));
    if (!didLoad) {
      setDidLoad(true);
    }
  }, [didLoad, dispatch, filter, topic, authenticatedUser]);

  return (
    <div className='feed'>
      <MenuBar />
      { didLoad ?
          <ArticleCards type='feed' /> : <Loading />
      }
    </div>
  )
}

export default Feed
