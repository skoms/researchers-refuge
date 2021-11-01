import React, { useEffect, useState } from 'react'
import styles from './ArticleCard.module.css'
import { Fragment } from 'react'
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useLocation } from 'react-router-dom'
import { selectDarkModeOn } from '../../../darkmodeButton/darkModeButtonSlice'
import { updateTopic } from '../../../feed/feedSlice'
import { selectAuthenticatedUser } from '../../../user/userAccManage/userAccSlice'
import { accreditDiscredit } from '../articleCardsSlice'
import { getIconUrl } from '../../../../Icons'
import { selectIsMobile } from '../../../../app/screenWidthSlice'
import { capitalize } from '../../../../utils/helpers'

const ArticleCard = ({
  id,
  credits,
  topic,
  authorId,
  author,
  title,
  intro,
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const user = useSelector(selectAuthenticatedUser)
  const darkModeOn = useSelector(selectDarkModeOn)
  const isMobile = useSelector(selectIsMobile)

  const inactiveColor = darkModeOn ? '161B22' : 'CECECE'
  const accreditColor = '00A300'
  const discreditColor = 'DD3939'

  const [creditedStatus, setCreditedStatus] = useState()
  const [didLoad, setDidLoad] = useState(false)

  useEffect(() => {
    if (!didLoad && user) {
      if (user.accreditedArticles.includes(id)) {
        setCreditedStatus('accredited')
      } else if (user.discreditedArticles.includes(id)) {
        setCreditedStatus('discredited')
      }
      setDidLoad(true)
    }
  }, [didLoad, user, id])

  const goToTopic = (e) => {
    dispatch(updateTopic(e.target.innerHTML.toLowerCase()))
    history.push({ pathname: '/', state: { from: location.pathname } })
  }

  const accredit = () => {
    dispatch(
      accreditDiscredit({ id: id, user: user, credit: { credit: 'accredit' } }),
    )
    if (creditedStatus !== 'accredited') {
      setCreditedStatus('accredited')
    } else {
      setCreditedStatus('')
    }
  }

  const discredit = () => {
    dispatch(
      accreditDiscredit({
        id: id,
        user: user,
        credit: { credit: 'discredit' },
      }),
    )
    if (creditedStatus !== 'discredited') {
      setCreditedStatus('discredited')
    } else {
      setCreditedStatus('')
    }
  }

  return (
    <div
      data-testid="article-card-component"
      className={`${credits === undefined ? styles.relatedContainer : ''} ${
        styles.container
      } `}
    >
      {credits !== undefined ? (
        <div className={styles.credits}>
          <button onClick={accredit}>
            <img
              src={getIconUrl('checkmark', darkModeOn, {
                size: isMobile ? 16 : 20,
                colors: {
                  dark:
                    creditedStatus === 'accredited'
                      ? accreditColor
                      : inactiveColor,
                  light:
                    creditedStatus === 'accredited'
                      ? accreditColor
                      : inactiveColor,
                },
              })}
              alt="accredit button"
            />
          </button>
          <div>
            <img
              src={getIconUrl('star-box', null, {
                size: isMobile ? 16 : 20,
                colors: {
                  light: '38B6FF',
                },
              })}
              alt="credits"
              className={styles.ratingIcon}
            />
            <span>{credits}</span>
          </div>
          <button onClick={discredit}>
            <img
              src={getIconUrl('x', darkModeOn, {
                size: isMobile ? 16 : 20,
                colors: {
                  dark:
                    creditedStatus === 'discredited'
                      ? discreditColor
                      : inactiveColor,
                  light:
                    creditedStatus === 'discredited'
                      ? discreditColor
                      : inactiveColor,
                },
              })}
              alt="discredit button"
            />
          </button>
        </div>
      ) : (
        <Fragment />
      )}

      <div className={styles.headline}>
        <button onClick={goToTopic}>
          <span>{capitalize(topic, false)}</span>
        </button>
        <button
          onClick={() =>
            history.push({
              pathname: `/users/${authorId}`,
              state: { from: location.pathname },
            })
          }
        >
          <span>{capitalize(author, false)}</span>
        </button>
      </div>
      <div className={styles.title}>
        <h2
          onClick={() =>
            history.push({
              pathname: `/articles/${id}`,
              state: { from: location.pathname },
            })
          }
        >
          {title}
        </h2>
      </div>
      <div
        className={styles.intro}
        onClick={() =>
          history.push({
            pathname: `/articles/${id}`,
            state: { from: location.pathname },
          })
        }
      >
        <ReactMarkdown>{intro}</ReactMarkdown>
      </div>
    </div>
  )
}

export default ArticleCard
