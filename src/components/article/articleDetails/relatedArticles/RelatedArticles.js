import React, { useEffect, useState } from 'react'
import ArticleCard from '../../articleCards/articleCard/ArticleCard';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedArticles, selectRelatedArticles } from './relatedArticlesSlice';
import { Fragment } from 'react';

//TODO - Replace sample data used here and connect to API

const RelatedArticles = ({ article }) => {
  const [didLoad, setDidLoad] = useState(false);
  const dispatch = useDispatch();

  const relatedArticles = useSelector(selectRelatedArticles);
  
  useEffect(() => {
    if (!didLoad) {
      dispatch(getRelatedArticles({
        tags: [...( typeof article.tags === 'object' ? article.tags : [article.tags])],
        id: article.id
      }));
      setDidLoad(true);
    }
  }, [didLoad, dispatch, article])
  return didLoad && relatedArticles && relatedArticles.length > 0 ? (
    <div className='related-articles'>
      <h2>Related Articles</h2>
      {
        relatedArticles.map(card => 
          <ArticleCard 
            id={card.id}
            key={card.id}
            title={card.title}
            topic={card.topic}
            author={card.author}
            intro={card.intro}
            credits={undefined}
          />
        )
      }
    </div>
  ) : <Fragment />
}

export default RelatedArticles
