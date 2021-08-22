import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectDarkModeOn,
  toggleDarkMode
} from './darkModeButtonSlice'

const DarkModeButton = () => {
  const darkmodeOn = useSelector(selectDarkModeOn);
  const dispatch = useDispatch();

  const toggleDarkmode = () => {
    dispatch(toggleDarkMode());
    // localStorage set to the opposit of the state, as the state 'darkMode' will at this point be the previous state
    localStorage.setItem('darkmode', ( darkmodeOn === false ? true : false).toString());
    document.getElementsByTagName('body')[0].classList.toggle('darkmode');
  }

  window.addEventListener('load', () => {
    console.log('loaded');
    if ( darkmodeOn ) {
      document.getElementsByTagName('body')[0].classList.add('darkmode');
    }
  });
  return (
    <div>
      <button className="darkmode-button" onClick={toggleDarkmode}>
        { darkmodeOn 
        ?
        <img src="https://img.icons8.com/material-rounded/24/ffffff/sun--v1.png" alt="darkmode button"/>
        :
          <img src="https://img.icons8.com/ios-filled/20/ffffff/crescent-moon.png" alt="darkmode button"/>
        }
      </button>
    </div>
  )
}

export default DarkModeButton
