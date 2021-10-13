import React from 'react'
import styles from './MenuBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsMobile } from '../../app/screenWidthSlice';
import { updateFilter } from '../feed/feedSlice';
import { toFirstPage } from '../paginationBar/paginationBarSlice';
import { getIconUrl } from '../../Icons';

const MenuBar = () => {
  const dispatch = useDispatch();
  const isMobile = useSelector(selectIsMobile);

  const select = (e) => {
    const { parentElement, classList, value, tagName } = e.target;
    if (tagName === 'BUTTON') {
      if ( !classList.contains('selected') ) {
        parentElement.querySelectorAll('button').forEach(element => {
          const { classList } = element;
          classList.contains('selected') && classList.remove('selected')
        });
        classList.add('selected');
        dispatch(updateFilter(value));
        dispatch(toFirstPage());
      }
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <button 
          className={`${styles.button} selected`} 
          onClick={select} 
          value='popular'
        >
          Popular
        </button>
        <button
          className={styles.button}
          onClick={select}
          value='new'
        >
          New
        </button>
        <button
          className={styles.button}
          onClick={select}
          value='top'
        >
          Top
        </button>
        <button
          className={styles.button}
          onClick={select}
          value='following'
        >
          Following
        </button>
      </div>
      <a href="/write-article">
        { !isMobile ? 
          <button className={styles.button}>New Article</button>
          :
          <img src={getIconUrl('pen-and-paper', null, {
            size: 28,
            colors: {
              light: 'FFFFFF'
            }
          })} alt='write article button'/>
        }
      </a>
    </div>
  )
}

export default MenuBar
