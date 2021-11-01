import React, { useEffect, useState } from 'react'
import styles from './RelatedArticles.module.css'
import ArticleCard from '../../articleCards/articleCard/ArticleCard'
import { useDispatch, useSelector } from 'react-redux'
import {
  getRelatedArticles,
  selectRelatedArticles,
} from './relatedArticlesSlice'
import { Fragment } from 'react'
import Loading from '../../../loading/Loading'

const RelatedArticles = ({ article }) => {
  const [didLoad, setDidLoad] = useState(false)
  const dispatch = useDispatch()

  const relatedArticles = useSelector(selectRelatedArticles)

  useEffect(() => {
    if (!didLoad) {
      dispatch(
        getRelatedArticles({
          tags: [
            ...(typeof article.tags === 'object'
              ? article.tags
              : [article.tags]),
          ],
          id: article.id,
        }),
      )
      setDidLoad(true)
    }
  }, [didLoad, dispatch, article])
  return didLoad && relatedArticles && relatedArticles.length > 0 ? (
    <div className={styles.container}>
      <h2>Related Articles</h2>
      {relatedArticles.map((card) => (
        <ArticleCard
          id={card.id}
          key={card.id}
          title={card.title}
          topic={card.topic}
          author={`${card.User.firstName} ${card.User.lastName}`}
          intro={card.intro}
          credits={undefined}
        />
      ))}
    </div>
  ) : relatedArticles ? (
    <div className={styles.container}>
      <Loading />
    </div>
  ) : (
    <Fragment />
  )
}

export default RelatedArticles
