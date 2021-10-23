import React, { useEffect, useState } from 'react'
import styles from './SearchResultsFeed.module.css';
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import Loading from '../loading/Loading'
import { selectSearchTerm, updateSearchTerm } from '../searchField/searchFieldSlice'
import { getResults, selectArticlesResults, selectTopicsResults, selectUsersResults } from './searchResultsSlice'
import { capitalize } from '../../utils/helpers';
import ArticleCards from '../article/articleCards/ArticleCards'
import { selectCategories } from '../topics/topicsSlice'
import { selectDarkModeOn } from '../darkmodeButton/darkModeButtonSlice'
import ResultRecUser from '../resultRecUser/ResultRecUser'
import { updateTopic } from '../feed/feedSlice'
import { selectAuthenticatedUser } from '../user/userAccManage/userAccSlice'
import { selectIsMobile } from '../../app/screenWidthSlice'
import { selectPage } from '../paginationBar/paginationBarSlice'
import { getIconUrl } from '../../Icons';
import useDebounce from '../../customHooks/useDebounce';

const SearchResultsFeed = () => {
  const [didLoad, setDidLoad] = useState(false);
  const [displayedUser, setDisplayedUser] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const { term } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const searchTerm = useSelector(selectSearchTerm);
  const users = useSelector(selectUsersResults);
  const topics = useSelector(selectTopicsResults);
  const articles = useSelector(selectArticlesResults);
  const categories = useSelector(selectCategories);
  const darkModeOn = useSelector(selectDarkModeOn);
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const isMobile = useSelector(selectIsMobile);
  const page = useSelector(selectPage);

  useEffect(() => {
    if (!didLoad) {
      dispatch(getResults({ query: term, page }));
      dispatch(updateSearchTerm(term));
      setDidLoad(true);
    }
  }, [didLoad, term, dispatch, page]);

  useDebounce(() => {
    if (searchTerm !== '') {
      dispatch(getResults({ query: searchTerm, page }));
    }
  }, 750, [searchTerm]);

  const goToTopic = (e) => {
    dispatch(updateTopic(e.target.innerHTML.toLowerCase()));
    history.push({ pathname: `/`, state: { from: location.pathname }});
  }

  const nextPrevButton = (e, name) => {
    switch (name) {
      case 'prev':
        if ( displayedUser !== 0 ) {
          setDisplayedUser(displayedUser - 1);
        }
        break;
      case 'next':
        if ( displayedUser !== users.length - 1 ) {
          setDisplayedUser(displayedUser + 1);
        }
        break;
      default:
        break;
    }
  }

  const handleTouchStart = (e) => {
    setTouchPosition(e.touches[0].clientX);
  }

  const handleTouchMove = (e) => {
    const startPos = touchPosition;
    if (touchPosition === null) return;

    const currentPos = e.touches[0].clientX;
    const diff = startPos - currentPos;

    if (diff > 5 ) {
      nextPrevButton(null, 'next');
    }
    if (diff < -5 ) {
      nextPrevButton(null, 'prev');
    }
    setTouchPosition(null);
  }

  const filteredUsers = () => {
    if (authenticatedUser) {
      return users.filter(user => authenticatedUser.id !== user.id);
    } else {
      return users;
    }
  }

  return didLoad ? (
    <div className={styles.feed}>
      { searchTerm || term ?
        <div className={styles.infoBar}>
          <h4>Search results for: '{searchTerm || term}'</h4>
        </div>
        :
        <Fragment />
      }
      { users && filteredUsers() && filteredUsers().length > 0 ?
        <div className={`${styles.results} ${styles.users}`}>
          <h4>Users</h4>
          <div className={styles.userResultsMain} 
               onTouchStart={handleTouchStart}
               onTouchMove={handleTouchMove}
          >
            { !isMobile &&
              <button className={`${styles.prev} ${styles.navBtn} ${displayedUser === 0 ? 'invisible' : ''}`} onClick={(e) => nextPrevButton(e, 'prev')}>
                <img src={getIconUrl('prev', darkModeOn)} alt="previous button"/>
              </button>
            }
            <div key={filteredUsers()[displayedUser].id} className={styles.userCard}>
              <ResultRecUser key={displayedUser} type='res' user={filteredUsers()[displayedUser]} />
            </div>
            { !isMobile &&
              <button className={`${styles.next} ${styles.navBtn} ${displayedUser === filteredUsers().length - 1 ? 'invisible' : ''}`} onClick={(e) => nextPrevButton(e, 'next')}>
                <img src={getIconUrl('next', darkModeOn)} alt="next button"/>
              </button>
            }
          </div>
          <div className={styles.points}>
            { filteredUsers().length > 1 ?
              filteredUsers().map( (user, id) => 
                <div key={id} className={`${styles.point} ${id} ${id === displayedUser ? 'point-selected' : '' }`} onClick={() => setDisplayedUser(id)}/>
              )
              :
              <Fragment />
            }
          </div>
        </div>
        :
        <div className={`${styles.empty} ${styles.results} ${styles.users}`}>
          <h4>No users match your search...</h4>
        </div>
      }
      { topics && topics.length > 0 ?
        <div className={`${styles.results} ${styles.topics}`}>
          <h4>Topics</h4>
          {
            categories.map( category => 
              {
                const categoryTopics = topics.filter( topic => category.id === topic.categoryId ); 
                return categoryTopics.length > 0 && (
                  <div key={category.id}>
                    <h5>{capitalize(category.name)}</h5>
                    <ul>
                      {
                        categoryTopics.map( topic => 
                          <li key={topic.id}><button onClick={goToTopic}>{capitalize(topic.name)}</button></li>
                        )
                      }
                    </ul>
                  </div>
                )
              }
            )
          }
        </div>
        :
        <div className={`${styles.empty} ${styles.results} ${styles.topics}`}>
          <h4>No topics match your search...</h4>
        </div>
      }
      
      { articles && articles.length > 0  ?
        <div className={`${styles.results} ${styles.articles}`}>
          <h4>Articles</h4> 
          <ArticleCards type='results' />     
        </div>
        :
        <div className={`${styles.empty} ${styles.results} ${styles.articles}`}>
          <h4>No articles match your search...</h4>
        </div>
      }
    </div>
  ) : <div className={styles.feed}><Loading /></div>
}

export default SearchResultsFeed