import React from 'react'

import ArticleCard from './articleCard/ArticleCard'

const ArticleCards = (props) => {
  const { state, dispatch } = props;
  return (
    <div>
      <p>Cards go here: </p>
      <ArticleCard />
    </div>
  )
}

export default ArticleCards
