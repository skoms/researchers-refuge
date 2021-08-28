import React from 'react'
import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Data from '../../../../Data'
import { updateTopic } from '../../../feed/feedSlice';

const data = new Data();

const ArticleCard = props => {
  const dispatch = useDispatch()
  const history = useHistory();

  const goToTopic = (e) => {
    dispatch(updateTopic(e.target.innerHTML.toLowerCase()));
    history.push('/');
  }
  return (
    <div className='article-card'>
      <div className="article-card-headline">
        <button onClick={goToTopic}><span>{data.capitalize(props.topic, false)}</span></button>
        <a href={`/users/${props.authorId}`}><span>{props.author}</span></a>
      </div>
      <a href={`/articles/${props.id}`}><h2>{props.title}</h2></a>
      <a href={`/articles/${props.id}`}><ReactMarkdown>{props.intro}</ReactMarkdown></a>
    </div>
  )
}

export default ArticleCard
