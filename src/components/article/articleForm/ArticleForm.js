import React, { useEffect, useState } from 'react'
import styles from './ArticleForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useHistory, useLocation } from 'react-router'

import TopicSelect from '../../topicSelect/TopicSelect'
import {
  selectArticle,
  updateArticleStateByKey,
  updateArticle,
  postArticle,
  getArticleIfOwner,
} from '../manageArticle/manageArticleSlice'
import { selectAuthenticatedUser } from '../../user/userAccManage/userAccSlice'
import { selectTopic, updateTopic } from '../../feed/feedSlice'
import TypedButton from '../../typedButton/TypedButton'

const ArticleForm = ({ isUpdate }) => {
  const dispatch = useDispatch()
  const [didLoad, setDidLoad] = useState(false)
  const article = useSelector(selectArticle)
  const topic = useSelector(selectTopic)
  const { id } = useParams()
  const history = useHistory()
  const location = useLocation()
  const user = useSelector(selectAuthenticatedUser)

  const forEachKeyToUpdate = (callback) => {
    const keys = ['title', 'intro', 'body', 'published', 'tags', 'topic']
    keys.forEach(callback)
  }

  useEffect(() => {
    const getArticleInfo = async (id, user) => {
      await dispatch(getArticleIfOwner({ id, user }))
        .then((res) => res.payload)
        .then((res) => {
          if (res.status === 200) {
            forEachKeyToUpdate((key) => {
              if (key === 'topic') {
                dispatch(updateTopic(res.article.topic))
              } else {
                dispatch(
                  updateArticleStateByKey({
                    key: key,
                    value: res.article[key],
                  }),
                )
              }
            })
          } else if (res.status === 401) {
            history.push({
              pathname: '/forbidden',
              state: { from: location.pathname },
            })
          }
        })
    }

    dispatch(updateArticleStateByKey({ key: 'topic', value: topic }))

    if (!didLoad) {
      isUpdate && user && getArticleInfo(id, user)
      setDidLoad(true)
    }
  }, [topic, dispatch, didLoad, id, isUpdate, user, history, location.pathname])

  const onChangeHandler = (e) => {
    dispatch(
      updateArticleStateByKey({ key: e.target.id, value: e.target.value }),
    )
  }

  const fieldsAreValid = () => {
    forEachKeyToUpdate((input) => {
      const target = document.querySelector(`#${input}-input-div`)
      target.classList.remove('invalid')
    })
    const invalidInputs = Object.keys(article).filter(
      (key) =>
        ['title', 'intro', 'body', 'published', 'tags', 'topic'].includes(
          key,
        ) && !article[key],
    )
    if (invalidInputs.length > 0) {
      invalidInputs.forEach((input) => {
        const target = document.querySelector(`#${input}-input-div`)
        target.classList.toggle('invalid')
      })
      return false
    } else {
      return true
    }
  }

  const submit = (e) => {
    e.preventDefault()
    if (fieldsAreValid()) {
      if (isUpdate) {
        dispatch(updateArticle({ article: article, id: id, user: user }))
          .then((res) => res.payload)
          .then((res) => {
            if (res.status === 204) {
              history.push({
                pathname: `/articles/${id}`,
                state: { from: location.pathname },
              })
            } else if (res.status === 403) {
              history.push({
                pathname: '/forbidden',
                state: { from: location.pathname },
              })
            }
          })
      } else {
        dispatch(postArticle({ article: article, user: user }))
          .then((res) => res.payload)
          .then((res) => {
            if (res.status === 201) {
              history.push({
                pathname: `/articles/${res.article.id}`,
                state: { from: location.pathname },
              })
            } else if (res.status === 403) {
              history.push({
                pathname: '/forbidden',
                state: { from: location.pathname },
              })
            }
          })
      }
      dispatch(updateTopic('home'))
    }
  }

  const cancel = (e) => {
    e.preventDefault()
    history.push({ pathname: '/', state: { from: location.pathname } })
    dispatch(updateTopic('home'))
  }

  return (
    didLoad && (
      <div className={styles.container} data-testid="article-form-component">
        <form
          data-testid="article-form"
          className={styles.form}
          onSubmit={submit}
        >
          <h1 className={styles.h1}>
            {`${isUpdate ? 'UPDATE' : 'CREATE'} ARTICLE`}
          </h1>
          <div className={`form-input ${styles.title}`} id="title-input-div">
            <input
              id="title"
              name="title"
              type="text"
              value={article.title || ''}
              onChange={onChangeHandler}
            />
            <label htmlFor="title">Title</label>
          </div>
          <div className={`form-input ${styles.intro}`} id="intro-input-div">
            <textarea
              id="intro"
              name="intro"
              rows="20"
              cols="60"
              value={article.intro || ''}
              onChange={onChangeHandler}
              placeholder="Uses Markdown formatting"
            />
            <label htmlFor="intro">Intro</label>
          </div>
          <div className={`form-input ${styles.body}`} id="body-input-div">
            <textarea
              id="body"
              name="body"
              rows="20"
              cols="60"
              value={article.body || ''}
              onChange={onChangeHandler}
              placeholder="Uses Markdown formatting"
            />
            <label htmlFor="body">Body</label>
            <a
              href="https://www.markdownguide.org/cheat-sheet"
              target="_blank"
              rel="noreferrer"
            >
              Cheat Sheet
            </a>
          </div>
          <div className={`form-input ${styles.date}`} id="published-input-div">
            <input
              id="published"
              data-testid="date-input"
              name="date"
              type="date"
              value={article.published || ''}
              onChange={onChangeHandler}
            />
            <label htmlFor="published">Published: </label>
          </div>
          <div className={`form-input ${styles.topic}`} id="topic-input-div">
            <TopicSelect use="ArticleForm" />
            <label htmlFor="topic">Topic: </label>
          </div>
          <div className={`form-input ${styles.tags}`} id="tags-input-div">
            <input
              id="tags"
              name="tags"
              type="text"
              value={article.tags || ''}
              onChange={onChangeHandler}
              placeholder="One or more separated by ','"
            />
            <label htmlFor="tags">Tags:</label>
          </div>

          <div className={styles.formButtons}>
            <TypedButton
              buttontype="primary"
              type="submit"
              content={isUpdate ? 'Update' : 'Create'}
            />
            <TypedButton
              buttontype="secondary"
              onClick={cancel}
              content="Cancel"
            />
          </div>
        </form>
      </div>
    )
  )
}

export default ArticleForm
