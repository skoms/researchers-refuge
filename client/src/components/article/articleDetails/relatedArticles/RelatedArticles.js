import React from 'react'
import ArticleCard from '../../articleCards/articleCard/ArticleCard';

//TODO - Replace sample data used here and connect to API
const dataCells = [
  {
    id: 1,
    title: 'Article 1',
    intro: 'This is article 1',
    topic: 'test',
    author: 'jimmy' 
  },
  {
    id: 2,
    title: 'Article 2',
    intro: 'This is article 2',
    topic: 'test',
    author: 'jimmy' 
  },
  {
    id: 3,
    title: 'Article 3',
    intro: 'This is article 3',
    topic: 'test',
    author: 'jimmy' 
  },
  {
    id: 4,
    title: 'Article 4',
    intro: 'This is article 4',
    topic: 'test',
    author: 'jimmy' 
  },
  {
    id: 5,
    title: 'Article 5',
    intro: 'This is article 5',
    topic: 'test',
    author: 'jimmy' 
  },
  {
    id: 6,
    title: 'Article 6',
    intro: 'This is article 6',
    topic: 'test',
    author: 'jimmy' 
  },
];

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
