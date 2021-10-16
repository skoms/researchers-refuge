import React, { useEffect, useState } from 'react'
import styles from './ArticleCards.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserArticles } from '../../user/userProfile/userFeedSlice';
import { selectFeedArticles } from '../../feed/feedSlice';
import { selectArticlesResults } from '../../searchResults/searchResultsSlice';
import { selectArticles, updateArticles } from './articleCardsSlice';
import { getArticleInfo } from '../articleDetails/articleDetailsSlice';
import ArticleCard from './articleCard/ArticleCard';
import Loading from '../../loading/Loading';
import PaginationBar from '../../paginationBar/PaginationBar';
import { selectLastPage } from '../../paginationBar/paginationBarSlice';
import { selectDarkModeOn } from '../../darkmodeButton/darkModeButtonSlice';
import { getIconUrl } from '../../../Icons';

const ArticleCards = (props) => {
  const dispatch = useDispatch();
  const ownersArticles = useSelector(selectUserArticles);
  const feedArticles = useSelector(selectFeedArticles);
  const resultArticles = useSelector(selectArticlesResults);
  const articles = useSelector(selectArticles);
  const lastPage = useSelector(selectLastPage);
  const darkModeOn = useSelector(selectDarkModeOn);
  const [secondaryArticles, setSecondaryArticles] = useState(null); 
  const [didLoad, setDidLoad] = useState(false);

  useEffect(()=> {
    const getRecentlyAccredited = async () => {
      const slicedAndSorted = [...props.recentlyAccredited].reverse().slice(0,5);
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
    : 
    <div className={styles.noArticlesMessage}>
      <img
        src={getIconUrl('shrug', darkModeOn, {size: 50, colors: { dark: 'FFFFFF', light: '000000' }})}
        alt='shrug emoticon'
      />
      <p>Sorry, but we don't seem to have what you are looking for... </p>
    </div>
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
      <div className={styles.container}>
        { didLoad && articles ? 
          articlesOrEmptyMessage(articles) : <Loading /> 
        }
        { articles && articles.length !== 0 && lastPage !== 1 && <PaginationBar /> }
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        { didLoad && secondaryArticles ?
            articlesOrEmptyMessage(secondaryArticles) : <Loading />
        }
        { secondaryArticles && secondaryArticles.length !== 0 && lastPage !== 1 && <PaginationBar /> }
      </div>
    )
  }
  
}

export default ArticleCards
