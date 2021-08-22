import React from 'react'
import Data from '../../../../Data'

const data = new Data();

const ArticleCard = props => {
  return (
    <div className='article-card'>
      <div className="article-card-headline">
        <a href={`/topics/${props.topicId}`}><span>{data.capitalize(props.topic, false)}</span></a>
        <a href={`/users/${props.authorId}`}><span>{props.author}</span></a>
      </div>
      <a href={`/articles/${props.id}`}><h2>{props.title}</h2></a>
      <a href={`/articles/${props.id}`}><p>{props.intro}</p></a>
    </div>
  )
}

export default ArticleCard
