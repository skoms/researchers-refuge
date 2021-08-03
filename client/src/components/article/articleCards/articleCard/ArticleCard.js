import React from 'react'

const ArticleCard = props => {
  return (
    <div className='article-card'>
      <div className="article-card-headline">
        <a href={`/topics/${props.topic}`}><span>{props.topic}</span></a>
        <a href={`/users/${props.author}`}><span>{props.author}</span></a>
      </div>
      <a href={`/articles/${props.id}`}><h2>{props.title}</h2></a>
      <a href={`/articles/${props.id}`}><p>{props.intro}</p></a>
    </div>
  )
}

export default ArticleCard
