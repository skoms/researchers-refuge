import React from 'react'
import { useDispatch } from 'react-redux';
import { updateFilter } from '../feed/FeedSlice';

const MenuBar = () => {
  const dispatch = useDispatch();

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
      <div>
        <button onClick={select} className='selected' value='popular'>Popular</button>
        <button onClick={select} value='new'>New</button>
        <button onClick={select} value='top'>Top</button>
        <button onClick={select} value='bytopic'>By Topic</button>
      </div>
      <a href="/write-article">
        <button>Write New Article</button>
      </a>
    </div>
  )
}

export default MenuBar
