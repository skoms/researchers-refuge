import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import Loading from '../loading/Loading'
import { selectSearchTerm, updateSearchTerm } from '../searchField/searchFieldSlice'
import { getResults, selectArticlesResults, selectTopicsResults, selectUsersResults } from './searchResultsSlice'
import Data from '../../Data'
import ArticleCards from '../article/articleCards/ArticleCards'
import { selectCategories } from '../topics/topicsSlice'
import { selectDarkModeOn } from '../darkmodeButton/darkModeButtonSlice'
import ResultRecUser from '../resultRecUser/ResultRecUser'
import { updateTopic } from '../feed/feedSlice'
import { selectAuthenticatedUser } from '../user/userAccManage/userAccSlice'
import { selectIsMobile } from '../../app/screenWidthSlice'
import { selectPage } from '../paginationBar/paginationBarSlice'

const SearchResultsFeed = () => {
  const [didLoad, setDidLoad] = useState(false);
  const [displayedUser, setDisplayedUser] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const { term } = useParams();
  const dispatch = useDispatch();
  const data = new Data();
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
      console.log(term);
      dispatch(getResults({ query: term, page }));
      dispatch(updateSearchTerm(term));
      setDidLoad(true);
    } else if (searchTerm !== '') {
      dispatch(getResults({ query: searchTerm, page }));
    }
  }, [didLoad, term, dispatch, searchTerm, page]);

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
    <div className='feed'>
      { searchTerm || term ?
        <div className='info-bar'>
          <h4>Search results for: '{searchTerm || term}'</h4>
        </div>
        :
        <Fragment />
      }
      { users && filteredUsers() && filteredUsers().length > 0 ?
        <div className="results users">
          <h4>Users</h4>
          <div className="user-results-main" 
               onTouchStart={handleTouchStart}
               onTouchMove={handleTouchMove}
          >
            { !isMobile &&
              <button className={`prev nav-btn ${displayedUser === 0 ? 'invisible' : ''}`} onClick={(e) => nextPrevButton(e, 'prev')}>
                { darkModeOn 
                  ?
                    <img src="https://img.icons8.com/ios/40/38B6FF/circled-chevron-left.png" alt="previous button"/>
                  :
                    <img src="https://img.icons8.com/ios/40/000000/circled-chevron-left.png" alt="previous button"/>
                }
              </button>
            }
            <div key={filteredUsers()[displayedUser].id} className="user-card">
              <ResultRecUser key={displayedUser} type='res' user={filteredUsers()[displayedUser]} />
            </div>
            { !isMobile &&
              <button className={`next nav-btn ${displayedUser === filteredUsers().length - 1 ? 'invisible' : ''}`} onClick={(e) => nextPrevButton(e, 'next')}>
                { darkModeOn 
                  ?
                    <img src="https://img.icons8.com/ios/40/38B6FF/circled-chevron-right.png" alt="previous button"/>
                  :
                    <img src="https://img.icons8.com/ios/40/000000/circled-chevron-right.png" alt="previous button"/>
                }
              </button>
            }
          </div>
          <div className="points">
            { filteredUsers().length > 1 ?
              filteredUsers().map( (user, id) => 
                <div key={id} className={`point ${id} ${id === displayedUser ? 'point-selected' : '' }`} onClick={() => setDisplayedUser(id)}/>
              )
              :
              <Fragment />
            }
          </div>
        </div>
        :
        <div className="empty results users">
          <h4>No users match your search...</h4>
        </div>
      }
      { topics && topics.length > 0 ?
        <div className="results topics">
          <h4>Topics</h4>
          {
            categories.map( category => 
              {
                const categoryTopics = topics.filter( topic => category.id === topic.categoryId ); 
                return categoryTopics.length > 0 && (
                  <div key={category.id}>
                    <h5>{data.capitalize(category.name)}</h5>
                    <ul>
                      {
                        categoryTopics.map( topic => 
                          <li key={topic.id}><button onClick={goToTopic}>{data.capitalize(topic.name)}</button></li>
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
        <div className="empty results topics">
          <h4>No topics match your search...</h4>
        </div>
      }
      
      { articles && articles.length > 0  ?
        <div className="results articles">
          <h4>Articles</h4> 
          <ArticleCards type='results' />     
        </div>
        :
        <div className="empty results articles">
          <h4>No articles match your search...</h4>
        </div>
      }
    </div>
  ) : <div className='feed'><Loading /></div>
}

export default SearchResultsFeed