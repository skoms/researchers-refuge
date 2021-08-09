import React from 'react'

import ArticleCard from './articleCard/ArticleCard'
import tempCards from "../../../data/articles";

const ArticleCards = (props) => {
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
  return (
    <div className='article-cards'>
      {
        tempCards.map( card => 
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

export default ArticleCards
