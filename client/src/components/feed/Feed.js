import React from 'react'

import MenuBar from '../menuBar/MenuBar'
import ArticleCards from '../article/articleCards/ArticleCards'

const Feed = () => {
  return (
    <div className='feed'>
      <h4>Feed:</h4>
      <h3>MenuBar:</h3>
      <MenuBar />
      <h3>ArticleCards:</h3>
      <ArticleCards />
    </div>
  )
}

export default Feed
