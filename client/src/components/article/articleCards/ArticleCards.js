import React from 'react'

import ArticleCard from './articleCard/ArticleCard'

const tempCards = [ 
  {
    id: 1,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 2,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 3,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 4,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 5,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 6,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 7,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 8,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 9,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 10,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 11,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 12,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 13,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 14,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 15,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 16,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 17,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 18,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 19,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 20,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 21,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 22,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 23,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
  {
    id: 24,
    title: 'Example Title',
    topic: 'Example topic',
    author: 'Example author',
    intro: 'Example Intro'
  },
 ];

const ArticleCards = (props) => {
  window.addEventListener('scroll', e => {
    let scrollbarTimeout;
    if ( e.target === true 
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
