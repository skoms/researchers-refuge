import React from 'react'

import SearchField from '../searchField/SearchField'

let loggedIn = true;

const Header = () => {
  return (
    <div className='header'>
      <a className='logo-home-a' href="/">
        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="logo" /> 
        <h2>Researchers' Refuge</h2>
      </a>
      <div className="search">
        <SearchField />
      </div>
      { 
      loggedIn ?
        <a className='my-profile-a' href="/my-profile">
          <button>Sign Out</button>
          <button>My Profile</button>
          <img src="https://via.placeholder.com/30" alt="placeholder" />
        </a>
      :
        <div className='sign-buttons'>
          <a href="/sign-in">
            <button>Sign In</button>
          </a>
          <a href="/sign-up">
            <button>Sign Up</button>
          </a>
        </div>
      }
    </div>
  )
}

export default Header
