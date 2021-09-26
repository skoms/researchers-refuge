import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectTopic, updateTopic } from '../feed/feedSlice';
import { selectCategories } from '../topics/topicsSlice';
import Data from '../../Data';
import { selectDarkModeOn } from '../darkmodeButton/darkModeButtonSlice';


const TopicSelect = ({ use }) => {
  const dispatch = useDispatch();
  const topic = useSelector(selectTopic);
  const categories = useSelector(selectCategories);
  const darkModeOn = useSelector(selectDarkModeOn);
  const data = new Data();
  
  const changeHandler = (e) => {
    dispatch(updateTopic(e.target.value));
  }

  const clearTopic = () => {
    dispatch(updateTopic('home'));
  }

  useEffect(() => {
    document.getElementById('topic-select').value = topic;
  }, [topic])

  return (
    <div className='topic-select'>
      <select name="topic-select" id="topic-select" value={topic} onChange={changeHandler}>
        { use === 'header' && <option className='default' value='home' >Home</option> }
        { use === 'ArticleForm' && <option className='default' value='none' >None</option> }
        { categories ?
          categories.map( category => {
            return (
              <optgroup key={category.id} label={data.capitalize(category.name)}>
                {
                  category.Topics.map(topic => <option key={topic.id} value={topic.name}>{data.capitalize(topic.name)}</option>)
                }
              </optgroup>
            )
          })
          :
          <Fragment />
        }
      </select>  
      { topic !== 'home' && use !== 'ArticleForm' ?
        <button onClick={clearTopic}>
          <img src={`https://img.icons8.com/fluency-systems-filled/20/${ darkModeOn ? 'DD3939' : '15458A' }/x.png`} alt='clear topic button' />
        </button>
        : <Fragment />
      }
      
    </div>
  )
}

export default TopicSelect