import React, { useLayoutEffect } from 'react'
import styles from './DarkModeButton.module.css';
import { useSelector, useDispatch } from 'react-redux'
import {
  selectDarkModeOn,
  toggleDarkMode
} from './darkModeButtonSlice'
import { getIconUrl } from '../../Icons';

const DarkModeButton = () => {
  const darkmodeOn = useSelector(selectDarkModeOn);
  const dispatch = useDispatch();

  const toggleDarkmode = () => {
    dispatch(toggleDarkMode());
    // localStorage set to the opposite of the state, as the state 'darkMode' will at this point be the previous state
    localStorage.setItem('darkmode', ( darkmodeOn === false ? true : false).toString());
    document.getElementsByTagName('body')[0].classList.toggle('darkmode');
  }

  useLayoutEffect(() => {
    if (localStorage.getItem('darkmode') === 'true') {
      document.getElementsByTagName('body')[0].classList.add('darkmode');
    }
  }, [])
  return (
    <div>
      <button className={styles.darkModeButton} onClick={toggleDarkmode}>
        { darkmodeOn 
        ?
          <img src={getIconUrl('sun', null, {size: 24, colors: {light: 'FFFFFF'}})} alt="darkmode button"/>
        :
          <img src={getIconUrl('moon', null, {size: 24, colors: {light: 'FFFFFF'}})} alt="darkmode button"/>
        }
      </button>
    </div>
  )
}

export default DarkModeButton
