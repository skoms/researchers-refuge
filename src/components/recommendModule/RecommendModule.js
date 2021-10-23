import React, { useEffect, useState } from 'react'
import styles from './RecommendModule.module.css';
import { useSelector, useDispatch } from 'react-redux'
import { selectAuthenticatedUser } from '../user/userAccManage/userAccSlice'
import { capitalize } from '../../utils/helpers';
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
  const [didLoad, setDidLoad] = useState(false);

  const recommendedTopics = useSelector(selectRecommendedTopics);
  const recommendedArticles = useSelector(selectRecommendedArticles);
  const recommendedUsers = useSelector(selectRecommendedUsers);

  useEffect(() => {
    if (user !== null && !didLoad) {
      dispatch(getRecommendedTopics(user));
      dispatch(getRecommendedArticles(user));
      dispatch(getRecommendedUsers(user));
      setDidLoad(true);
    }
  }, [user, dispatch, didLoad])

  return user !== null && didLoad && (
    <div className={styles.container}>
      { recommendedTopics && recommendedTopics.length > 0 ? 
          <table className={styles.table}>
              <tbody>
              <tr>
                <th className={styles.th}>Recommended Topics</th>
              </tr>
              {
                recommendedTopics.map( topic => 
                  <tr key={topic.id}>
                    <td
                      className={styles.td}
                      onClick={() => dispatch(updateTopic(topic.name))}
                    >
                      {capitalize(topic.name)}
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        : 
          <Fragment />
      }
      { recommendedArticles && recommendedArticles.length > 0 ?
        <table className={styles.table}>
            <tbody>
            <tr>
              <th className={styles.th}>Recommended Articles</th>
            </tr>
            {
              recommendedArticles.map( article => 
                <tr key={article.id}>
                  <td className={styles.td}>
                    <a
                      className={styles.a}
                      href={`/articles/${article.id}`}
                    >
                      {capitalize(article.title)}
                    </a>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      : 
        <Fragment />
      }
      { recommendedUsers && recommendedUsers.length > 0 ?
          <table className={styles.table}>
              <tbody>
              <tr>
                <th className={styles.th}>Recommended Researchers</th>
              </tr>
              {
                recommendedUsers.map( user => 
                  <tr key={user.id}>
                    <td className={styles.td}>
                      <a
                        className={styles.a}
                        href={`/users/${user.id}`}
                      >
                        {capitalize(`${user.firstName} ${user.lastName}`)}
                      </a>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        : 
          <Fragment />
      }
    </div>
  )
}

export default RecommendModule
