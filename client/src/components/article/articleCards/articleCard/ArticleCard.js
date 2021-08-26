import React from 'react'
import { useDispatch } from 'react-redux';
import { updateTopic } from '../../../feed/feedSlice';
import Data from '../../../../Data'
import { useHistory } from 'react-router';

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
      <a href={`/articles/${props.id}`}><p>{props.intro}</p></a>
    </div>
  )
}

export default ArticleCard
