import React from 'react'
import ArticleCard from '../../articleCards/articleCard/ArticleCard';
import dataCells from "../../../../data/articles";

//TODO - Replace sample data used here and connect to API

const RelatedArticles = () => {
  return (
    <div className='related-articles'>
      <h2>Related Articles</h2>
      {
        dataCells.map(card => 
          <ArticleCard 
            id={card.id}
            key={card.id}
            title={card.title}
            topic={card.topic}
            author={card.author}
            intro={card.intro}
          />
        )
      }
    </div>
  )
}

export default RelatedArticles
