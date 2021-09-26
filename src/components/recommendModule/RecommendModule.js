import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuthenticatedUser } from '../user/userAccManage/userAccSlice'
import Data from '../../Data';
import {
  selectRecommendedTopics,
  selectRecommendedArticles,
  selectRecommendedUsers,
  getRecommendedTopics,
  getRecommendedArticles,
  getRecommendedUsers,
} from './recommendModuleSlice';
import { updateTopic } from '../feed/feedSlice';
import { Fragment } from 'react';

const RecommendModule = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthenticatedUser);
  const [didLoad, setdidLoad] = useState(false);
  const data = new Data();

  const recommendedTopics = useSelector(selectRecommendedTopics);
  const recommendedArticles = useSelector(selectRecommendedArticles);
  const recommendedUsers = useSelector(selectRecommendedUsers);

  useEffect(() => {
    if (user !== null && !didLoad) {
      dispatch(getRecommendedTopics(user));
      dispatch(getRecommendedArticles(user));
      dispatch(getRecommendedUsers(user));
      setdidLoad(true);
    }
  }, [user, dispatch, didLoad])

  return user !== null && didLoad && (
    <div className='rec-mod'>
      { recommendedTopics && recommendedTopics.length > 0 ?
        <table className='table-spacing'>
            <tbody>
            <tr>
              <th>Recommended Topics</th>
            </tr>
            {
              recommendedTopics.map( topic => 
                <tr key={topic.id}>
                  <td onClick={() => dispatch(updateTopic(topic.name))}>
                    {data.capitalize(topic.name)}
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      : <Fragment />
      }
      { recommendedArticles && recommendedArticles.length > 0 ?
        <table className='table-spacing'>
            <tbody>
            <tr>
              <th>Recommended Articles</th>
            </tr>
            {
              recommendedArticles.map( article => 
                <tr key={article.id}>
                  <td>
                    <a href={`/articles/${article.id}`}>
                      {data.capitalize(article.title)}
                    </a>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      : <Fragment />
      }
      { recommendedUsers && recommendedUsers.length > 0 ?
        <table className='table-spacing'>
            <tbody>
            <tr>
              <th>Recommended Researchers</th>
            </tr>
            {
              recommendedUsers.map( user => 
                <tr key={user.id}>
                  <td>
                    <a href={`/users/${user.id}`}>
                      {data.capitalize(`${user.firstName} ${user.lastName}`)}
                    </a>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      : <Fragment />
      }
    </div>
  )
}

export default RecommendModule