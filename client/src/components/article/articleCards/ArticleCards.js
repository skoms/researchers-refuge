import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectUserArticles } from '../../user/userProfile/userFeedSlice';
import { selectFeedArticles } from '../../feed/feedSlice';
import ArticleCard from './articleCard/ArticleCard';
import Loading from '../../loading/Loading';
import { selectArticlesResults } from '../../searchResults/searchResultsSlice';
import { selectArticles, updateArticles } from './articleCardsSlice';

const ArticleCards = (props) => {
  const dispatch = useDispatch();
  const ownersArticles = useSelector(selectUserArticles);
  const feedArticles = useSelector(selectFeedArticles);
  const resultArticles = useSelector(selectArticlesResults);
  const articles = useSelector(selectArticles);
  const [didLoad, setDidLoad] = useState(false);

  useEffect(()=> {
    switch (props.type) {
      case 'ownersArticles':
        dispatch(updateArticles(ownersArticles));
        break;
      case 'accreditedArticles':
        //TODO - Hook up this one too ( has to be done after implementing credit system and tracking )
        dispatch(updateArticles([  ]));
        break;
      case 'feed':
        dispatch(updateArticles(feedArticles));
        break;
      case 'results':
        dispatch(updateArticles(resultArticles));
        break;
      default:
        break;
    }
    if (!didLoad) {
      setDidLoad(true);
    }
  }, [didLoad, ownersArticles, feedArticles, resultArticles, dispatch, props.type])

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
        { didLoad && articles 
          ?
          articles.map( card => 
              <ArticleCard 
                type={props.type}
                id={card.id}
                key={card.id}
                title={card.title}
                topic={card.topic}
                credits={card.credits}
                topicId={card.topicId}
                author={`${card.User.firstName} ${card.User.lastName}`}
                authorId={card.userId}
                intro={card.intro}
              />
            )
          :
          <Loading />
        }
      </div>
  )
}

export default ArticleCards
