import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../loading/Loading'
import { selectSearchTerm, updateSearchTerm } from '../searchField/searchFieldSlice'
import { getResults, selectArticlesResults, selectTopicsResults, selectUsersResults } from './searchResultsSlice'
import Data from '../../Data'
import ArticleCards from '../article/articleCards/ArticleCards'
import { selectCategories } from '../topics/topicsSlice'

const SearchResultsFeed = () => {
  const [didLoad, setDidLoad] = useState(false);
  const [displayedUser, setDisplayedUser] = useState(0);
  const { term } = useParams();
  const users = useSelector(selectUsersResults);
  const topics = useSelector(selectTopicsResults);
  const articles = useSelector(selectArticlesResults);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const data = new Data();
  

  useEffect(() => {
    if (!didLoad) {
      dispatch(getResults(term));
      dispatch(updateSearchTerm(term));
      setDidLoad(true);
    }
  }, [didLoad, term, dispatch]);

  const goToTopic = (e) => {

  }

  return didLoad ? (
    <div className='feed'>
      { term ?
        <div className='info-bar'>
          <h4>Search results for: '{term}'</h4>
        </div>
        :
        <Fragment />
      }
      { users && users.length > 0 ?
        <div className="results users">
          <h4>Users</h4>
          <div className="user-results-main">
            <button className="previous">
              <img src="https://img.icons8.com/ios/40/000000/previous.png" alt='previous user'/>
            </button>
            <div key={users[displayedUser].id} className="user-card">
              <img src={users[displayedUser].imgURL} alt="profile-pic" />
            </div>
            <button className="next">
              <img src="https://img.icons8.com/ios/40/000000/next.png" alt='next user'/>
            </button>
          </div>
          <p>{`Showing user ${displayedUser + 1} out of ${users.length}`}</p>
          <div className="points">
            { users.length > 1 ?
              users.map( (user, id) => 
                <div className={`point ${id === 0 ? 'point-selected' : '' }`}></div>
              )
              :
              <Fragment />
            }
            <div className="dot"></div>
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
                          <li key={topic.id}><a href="/" onClick={goToTopic}>{data.capitalize(topic.name)}</a></li>
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