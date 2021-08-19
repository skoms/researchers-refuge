import React from 'react'
import { useDispatch } from 'react-redux';
import { update } from '../feed/FeedSlice';

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
        dispatch(update(value));
      }
    }
  }
  return (
    <div className='menu-bar'>
      <div>
        <button onClick={select}>Popular</button>
        <button onClick={select}>New</button>
        <button onClick={select}>Top</button>
        <button onClick={select}>By Topic</button>
      </div>
      <a href="/write-article">
        <button>Write New Article</button>
      </a>
    </div>
  )
}

export default MenuBar
