import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

import ArticleCard from './articleCard/ArticleCard';
import { Context } from '../../../Context';

const ArticleCards = (props) => {
  const [articles, setArticles] = useState([  ]);
  const history = useHistory();
  const [didLoad, setDidLoad] = useState(false);
  const context = useContext(Context);

  useEffect(()=> {
    const getArticles = async () => {
      await context.data.getArticles()
        .then( res => {
          switch (res.status) {
            case 200:
              setArticles(res.articles);
              console.log(res.articles);
              break;
            case 500:
              history.push('/error');
              break;
            default:
              console.log(`STATUS: ${res.status}, ERRORS: ${res.errors}`);
              break;
          }
        })
        .catch(err => {
          console.error(err);
          history.push('/error');
        })
    }
    if (!didLoad) {
      setDidLoad(true);
      getArticles();
    }
  }, [didLoad, context.data, history])

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
        articles.map( card => 
          <ArticleCard 
            id={card.id}
            key={card.id}
            title={card.title}
            topic={card.topic}
            author={`${card.User.firstName} ${card.User.lastName}`}
            authorId={card.userId}
            intro={card.intro}
          />
        )
      }
    </div>
  )
}

export default ArticleCards
