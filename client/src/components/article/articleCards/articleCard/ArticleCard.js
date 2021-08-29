import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Data from '../../../../Data'
import { updateTopic } from '../../../feed/feedSlice';

const data = new Data();

const ArticleCard = props => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [creditedStatus, setCreditedStatus] = useState('');

  const goToTopic = (e) => {
    dispatch(updateTopic(e.target.innerHTML.toLowerCase()));
    history.push('/');
  }

  const accredit = (e) => {
    if (creditedStatus !== 'accredited') {
      setCreditedStatus('accredited');
    }
  }

  return (
    <div className='article-card'>
      <div className="credits">
        <button className="accredit">
          <img 
            src={`https://img.icons8.com/ios-filled/${creditedStatus === 'accredited' ? '24' : '16'}/${creditedStatus === 'accredited' ? '00A300' : '161B22'}/checkmark--v1.png`}
            alt='accredit button'
          />
        </button>
        <div className="credits-num">
          <img src="https://img.icons8.com/ios/16/38B6FF/rating.png" alt='credits'/>
          <span>{props.credits}</span>
        </div>
        <button className="discredit">
          <img 
            src={`https://img.icons8.com/fluency-systems-filled/${creditedStatus === 'discredited' ? '24' : '16'}/${creditedStatus === 'discredited' ? 'DD3939' : '161B22'}/x.png`} 
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
