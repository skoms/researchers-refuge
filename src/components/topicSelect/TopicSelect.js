import React, { Fragment, useEffect, useRef } from 'react'
import styles from './TopicSelect.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectTopic, updateTopic } from '../feed/feedSlice';
import { selectCategories } from '../topics/topicsSlice';
import Data from '../../Data';
import { selectDarkModeOn } from '../darkmodeButton/darkModeButtonSlice';
import { getIconUrl } from '../../Icons';


const TopicSelect = ({ use }) => {
  const dispatch = useDispatch();
  const topic = useSelector(selectTopic);
  const categories = useSelector(selectCategories);
  const darkModeOn = useSelector(selectDarkModeOn);
  const data = new Data();

  const selectRef = useRef();
  
  const changeHandler = (e) => {
    dispatch(updateTopic(e.target.value));
  }

  const clearTopic = () => {
    dispatch(updateTopic('home'));
  }

  useEffect(() => {
    if (selectRef.current) selectRef.current.value = topic;
  }, [topic])

  return (
    <div className={styles.container}>
      <select className={styles.select} name="topic-select" ref={selectRef} value={topic} onChange={changeHandler}>
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
        <button className={styles.button} onClick={clearTopic}>
          <img src={getIconUrl('x', darkModeOn, {size: 20, colors: {dark: 'DD3939', light: '15458A'}})} alt='clear topic button' />
        </button>
        : <Fragment />
      }
    </div>
  )
}

export default TopicSelect
