import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Data from '../../../../Data'
import { selectDarkModeOn } from '../../../darkmodeButton/darkModeButtonSlice';
import { updateTopic } from '../../../feed/feedSlice';
import { selectAuthenticatedUser } from '../../../user/userAccManage/userAccSlice';
import { accreditDiscredit } from '../articleCardsSlice';

const data = new Data();

const ArticleCard = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectAuthenticatedUser);
  const darkModeOn = useSelector(selectDarkModeOn);

  const inactiveColor = darkModeOn ? '161B22' : 'CECECE';
  const accreditColor = '00A300';
  const discreditColor = 'DD3939';

  const [creditedStatus, setCreditedStatus] = useState();

  useEffect(() => {
    if (user.accreditedArticles.includes(props.id.toString())) {
      setCreditedStatus('accredited');
    } else if (user.discreditedArticles.includes(props.id.toString())) {
      setCreditedStatus('discredited');
    }
  }, [user, props.id]);

  const goToTopic = (e) => {
    dispatch(updateTopic(e.target.innerHTML.toLowerCase()));
    history.push('/');
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
    <div className='article-card'>
      <div className="credits">
        <button className="accredit" onClick={accredit}>
          <img 
            src={`https://img.icons8.com/ios-filled/16/${creditedStatus === 'accredited' ? accreditColor : inactiveColor }/checkmark--v1.png`}
            alt='accredit button'
          />
        </button>
        <div className="credits-num">
          <img src="https://img.icons8.com/ios/16/38B6FF/rating.png" alt='credits'/>
          <span>{props.credits}</span>
        </div>
        <button className="discredit" onClick={discredit}>
          <img 
            src={`https://img.icons8.com/fluency-systems-filled/16/${creditedStatus === 'discredited' ? discreditColor : inactiveColor }/x.png`} 
            alt='discredit button'
          />
        </button>
      </div>
      <div className="article-card-headline">
        <button onClick={goToTopic}><span>{data.capitalize(props.topic, false)}</span></button>
        <a href={`/users/${props.authorId}`}><span>{props.author}</span></a>
      </div>
      <div className="title">
        <a href={`/articles/${props.id}`}><h2>{props.title}</h2></a>
      </div>
      <div className="intro">
        <a href={`/articles/${props.id}`}><ReactMarkdown>{props.intro}</ReactMarkdown></a>
      </div>
    </div>
  )
}

export default ArticleCard
