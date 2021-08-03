import React from 'react'

const MenuBar = () => {
  return (
    <div className='menu-bar'>
      <div>
        <button>Popular</button>
        <button>New</button>
        <button>Top</button>
        <button>By Topic</button>
      </div>
      <a href="/create-article">
        <button>Write New Article</button>
      </a>
    </div>
  )
}

export default MenuBar
