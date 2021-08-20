import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectUserArticles } from '../../user/userProfile/userFeedSlice';
import ArticleCard from './articleCard/ArticleCard';

const ArticleCards = (props) => {
  const ownersArticles = useSelector(selectUserArticles);
  const [articles, setArticles] = useState([  ]);
  const [didLoad, setDidLoad] = useState(false);

  useEffect(()=> {
    switch (props.type) {
      case 'ownersArticles':
        setArticles(ownersArticles);
        break;
      case 'accreditedArticles':
        //TODO - Hook up this one too ( has to be done after implementing credit system and tracking )
        setArticles([  ])
        break;
      default:
        break;
    }
    if (!didLoad) {
      setDidLoad(true);
      console.log(props);
    }
  }, [didLoad, props, ownersArticles])

  window.addEventListener('scroll', e => {
    let scrollbarTimeout;
    if ( e.target.tagName !== undefined 
         && e.target.classList.contains('on-scrollbar') === false ) {
        e.target.classList.add("on-scrollbar");
        clearTimeout(scrollbarTimeout);
        scrollbarTimeout = setTimeout(() => {
          e.target.classList.remove("on-scrollbar");
        }, 800);
    }
  }, true);
  return didLoad && articles ? (
      <div className='article-cards'>
          {articles.map( card => 
            <ArticleCard 
              id={card.id}
              key={card.id}
              title={card.title}
              topic={card.topic}
              author={`${card.User.firstName} ${card.User.lastName}`}
              authorId={card.userId}
              intro={card.intro}
            />
          )}
      </div>
      )
    :
      <Fragment />
}

export default ArticleCards
