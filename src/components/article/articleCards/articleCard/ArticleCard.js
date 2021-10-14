import React, { useEffect, useState } from 'react'
import styles from './ArticleCard.module.css';
import { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import Data from '../../../../Data'
import { selectDarkModeOn } from '../../../darkmodeButton/darkModeButtonSlice';
import { updateTopic } from '../../../feed/feedSlice';
import { selectAuthenticatedUser } from '../../../user/userAccManage/userAccSlice';
import { accreditDiscredit } from '../articleCardsSlice';
import { getIconUrl } from '../../../../Icons';
import { selectIsMobile } from '../../../../app/screenWidthSlice';

const data = new Data();

const ArticleCard = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector(selectAuthenticatedUser);
  const darkModeOn = useSelector(selectDarkModeOn);
  const isMobile = useSelector(selectIsMobile);

  const inactiveColor = darkModeOn ? '161B22' : 'CECECE';
  const accreditColor = '00A300';
  const discreditColor = 'DD3939';

  const [creditedStatus, setCreditedStatus] = useState();
  const [didLoad, setDidLoad] = useState(false)

  useEffect(() => {
    if (!didLoad && user) {
      if (user.accreditedArticles.includes(props.id)) {
        setCreditedStatus('accredited');
      } else if (user.discreditedArticles.includes(props.id)) {
        setCreditedStatus('discredited');
      }
      setDidLoad(true);
    }  
  }, [didLoad, user, props.id]);

  const goToTopic = (e) => {
    dispatch(updateTopic(e.target.innerHTML.toLowerCase()));
    history.push({ pathname: '/', state: { from: location.pathname }});
  }

  const accredit = () => {
    dispatch(accreditDiscredit({ id: props.id, user: user, credit: {credit : 'accredit'}}));
    if (creditedStatus !== 'accredited') {
      setCreditedStatus('accredited');
    } else {
      setCreditedStatus('');
    }
  }

  const discredit = () => {
    dispatch(accreditDiscredit({ id: props.id, user: user, credit: {credit : 'discredit'}}));
    if (creditedStatus !== 'discredited') {
      setCreditedStatus('discredited');
    } else {
      setCreditedStatus('');
    }
  }

  return (
    <div className={`${props.credits === undefined ? styles.relatedContainer : ''} ${styles.container} `}>
      { props.credits !== undefined ? 
        <div className={styles.credits}>
          <button onClick={accredit}>
            <img 
              src={getIconUrl('checkmark', darkModeOn, {
                size: isMobile ? 16 : 20,
                colors: {
                  dark: creditedStatus === 'accredited' ? accreditColor : inactiveColor,
                  light: creditedStatus === 'accredited' ? accreditColor : inactiveColor
                }
              })}
              alt='accredit button'
            />
          </button>
          <div>
            <img src={getIconUrl('star-box', null, {
                size: isMobile ? 16 : 20, 
                colors: {
                  light: '38B6FF'
                }
              }
            )} alt='credits' className={styles.ratingIcon}/>
            <span>{props.credits}</span>
          </div>
          <button onClick={discredit}>
            <img 
              src={getIconUrl('x', darkModeOn, {
                size: isMobile ? 16 : 20,
                colors: {
                  dark: creditedStatus === 'discredited' ? discreditColor : inactiveColor,
                  light: creditedStatus === 'discredited' ? discreditColor : inactiveColor
                }
              })} 
              alt='discredit button'
            />
          </button>
        </div>
        : <Fragment />
      }
      
      <div className={styles.headline}>
        <button onClick={goToTopic}><span>{data.capitalize(props.topic, false)}</span></button>
        <a href={`/users/${props.authorId}`}><span>{props.author}</span></a>
      </div>
      <div className={styles.title}>
        <a href={`/articles/${props.id}`}><h2>{props.title}</h2></a>
      </div>
      <div className={styles.intro}>
        <a href={`/articles/${props.id}`}><ReactMarkdown>{props.intro}</ReactMarkdown></a>
      </div>
    </div>
  )
}

export default ArticleCard
