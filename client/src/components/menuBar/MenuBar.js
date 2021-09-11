import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsMobile } from '../../app/screenWidthSlice';
import { updateFilter } from '../feed/feedSlice';

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
      }
    }
  }
  return (
    <div className='menu-bar'>
      <div className='menu-bar-filters'>
        <button onClick={select} className='selected' value='popular'>Popular</button>
        <button onClick={select} value='new'>New</button>
        <button onClick={select} value='top'>Top</button>
        <button onClick={select} value='following'>Following</button>
      </div>
      <a href="/write-article">
        { !isMobile ? 
          <button>New Article</button>
          :
          <img src='https://img.icons8.com/material/28/FFFFFF/create-new--v1.png' alt='write article button'/>
        }
      </a>
    </div>
  )
}

export default MenuBar
