import React from 'react'

const MenuBar = props => {
  const { select } = props;
  return (
    <div className='menu-bar'>
      <div>
        <button onClick={(e) => select(e)}>Popular</button>
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
