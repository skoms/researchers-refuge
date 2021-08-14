import React, { useContext, useState, useEffect } from 'react'
import DarkModeButton from '../darkmodeButton/DarkModeButton';
import { Context } from '../../Context';

import SearchField from '../searchField/SearchField'

const Header = () => {
  const context = useContext(Context);
  const [loggedIn, setLoggedIn] = useState(context.authenticatedUser !== null);

  useEffect(() => {
    setLoggedIn(context.authenticatedUser !== null);
  }, [context.authenticatedUser]);

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
        <div className='my-profile-div'>
          <DarkModeButton />
          <a href='/sign-out'>Sign Out</a>
          <a href="/my-profile">My Profile</a>
          <img src="https://via.placeholder.com/30" alt="placeholder" />
        </div>
      :
        <div className='sign-buttons'>
          <DarkModeButton />
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
