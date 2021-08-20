import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedArticles, selectFilter } from './FeedSlice' 
import MenuBar from '../menuBar/MenuBar'
import ArticleCards from '../article/articleCards/ArticleCards'
import { Fragment } from 'react'

const Feed = () => {
  const [didLoad, setDidLoad] = useState(false);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedArticles(filter));
    if (!didLoad) {
      setDidLoad(true);
    }
  }, [didLoad, dispatch, filter]);

  return (
    <div className='feed'>
      <MenuBar />
      { didLoad ?
          <ArticleCards type='feed' /> : <Fragment />
      }
    </div>
  )
}

export default Feed
