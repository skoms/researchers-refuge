import React, { useState } from 'react'

import MenuBar from '../menuBar/MenuBar'
import ArticleCards from '../article/articleCards/ArticleCards'

const Feed = () => {
  const [selectedFilter, setSelectedFilter] = useState('Popular');

  const select = (e) => {
    if (e.target.tagName === 'BUTTON') {
      const { target } = e;
      const parent = e.target.parentElement;
      if ( !target.classList.contains('selected') ) {
        parent.querySelectorAll('button').forEach(element => {
          element.classList.contains('selected') && element.classList.remove('selected')
        });
        target.classList.add('selected');
        setSelectedFilter(target.value);
      }
    }
  }
  return (
    <div className='feed'>
      <MenuBar 
        select={select}
      />
      <ArticleCards 
        filter={selectedFilter}
      />
    </div>
  )
}

export default Feed
