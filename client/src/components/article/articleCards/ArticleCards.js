import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectUserArticles } from '../../user/userProfile/userFeedSlice';
import { selectFeedArticles } from '../../feed/feedSlice';
import { selectArticlesResults } from '../../searchResults/searchResultsSlice';
import { selectArticles, updateArticles } from './articleCardsSlice';
import { getArticleInfo } from '../articleDetails/articleDetailsSlice';
import ArticleCard from './articleCard/ArticleCard';
import Loading from '../../loading/Loading';

const ArticleCards = (props) => {
  const dispatch = useDispatch();
  const ownersArticles = useSelector(selectUserArticles);
  const feedArticles = useSelector(selectFeedArticles);
  const resultArticles = useSelector(selectArticlesResults);
  const articles = useSelector(selectArticles);
  const [secondaryArticles, setSecondaryArticles] = useState(null); 
  const [didLoad, setDidLoad] = useState(false);

  useEffect(()=> {
    const getRecentlyAccredited = async () => {
      const sortedByMostRecent = [];
      for (let i = (props.recentlyAccredited.length - 1); i >= 0; i--) {
        const id = props.recentlyAccredited[i];
        sortedByMostRecent.push(id);
      }
      const slicedAndSorted = sortedByMostRecent.slice(0,5);
      if (slicedAndSorted.length > 0) {
        const returnArray = await Promise.all(
          slicedAndSorted.map(async (id) => {
            return await dispatch(getArticleInfo(id))
              .then(res => res.payload.article);
          })
        );
        setSecondaryArticles(returnArray);
      } else {
        setSecondaryArticles([]);;
      }
    }
    switch (props.type) {
      case 'ownersArticles':
        dispatch(updateArticles(ownersArticles));
        break;
      case 'accreditedArticles':
        getRecentlyAccredited(); // To not use the same state as Primary ArticleCards
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
  }, [didLoad, ownersArticles, feedArticles, resultArticles, dispatch, props.type, props.recentlyAccredited])

  const articlesOrEmptyMessage = (articles) => ( 
    articles.length !== 0 ?
      articles.map( card => 
        <ArticleCard 
          type={props.type}
          id={card.id}
          key={card.id}
          title={card.title}
          intro={card.intro}
          topic={card.topic}
          topicId={card.topicId}
          credits={card.credits}
          author={`${card.User.firstName} ${card.User.lastName}`}
          authorId={card.userId}
        />
      )
    : <p>Wow, such empty...</p>
  );

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

  if (props.type !== 'accreditedArticles') {
    return (
      <div className='article-cards'>
        { didLoad && articles ? 
          articlesOrEmptyMessage(articles) : <Loading /> 
        }
      </div>
    )
  } else {
    return (
      <div className='article-cards'>
        { didLoad && secondaryArticles ?
            articlesOrEmptyMessage(secondaryArticles) : <Loading />
        }
      </div>
    )
  }
  
}

export default ArticleCards
