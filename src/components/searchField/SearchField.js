import React from 'react'
import styles from './SearchField.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { selectDarkModeOn } from '../darkmodeButton/darkModeButtonSlice';
import { 
  updateSearchTerm,
  selectSearchTerm
} from './searchFieldSlice';
import { getIconUrl } from '../../Icons';
import useToggle from '../../customHooks/useToggle';
import { selectIsMobile } from '../../app/screenWidthSlice';

const SearchField = () => {
  const [mobileSearchActive, toggleMobileSearchActive] = useToggle(false);
  
  const searchTerm = useSelector(selectSearchTerm);
  const darkModeOn = useSelector(selectDarkModeOn);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isMobile = useSelector(selectIsMobile);

  const search = (e) => {
    e.preventDefault();
    if (searchTerm) {
      history.push({ pathname: `/search/${searchTerm}`, state: { from: location.pathname }});
      toggleMobileSearchActive(false);
    }
  }

  return !isMobile ? (
    <div className={styles.container}>
      <form onSubmit={search}>
        <input
          className={styles.input}
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => dispatch(updateSearchTerm(e.target.value))}
          placeholder="Search for articles or people"
        />
        <button className={styles.searchButton} type='submit'>
          <img 
            src={getIconUrl('magnifying-glass', darkModeOn, {
              size: 20,
              colors: {
                dark: '38B6FF',
                light: 'E8F7FF'
              }
            })}
            alt='search button'
          />
        </button>
      </form>
    </div>
  ) : (
    <div className={styles.container}>
      <button className={styles.toggleMobileSearch} onClick={toggleMobileSearchActive}>
        <img 
          src={getIconUrl('magnifying-glass', darkModeOn, {
            size: 32,
            colors: {
              dark: '38B6FF',
              light: 'E8F7FF'
            }
          })}
          alt='toggle search button'
        />
      </button>
      <div className={`${styles.mobileSearch} ${!mobileSearchActive && 'invisible'}`}>
        <form onSubmit={search}>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => dispatch(updateSearchTerm(e.target.value))}
            placeholder="Search for articles or people"
          />
          <button className={styles.searchButton} type='submit'>
            <img 
              src={getIconUrl('magnifying-glass', darkModeOn, {
                size: 20,
                colors: {
                  dark: '38B6FF',
                  light: 'E8F7FF'
                }
              })}
              alt='search button'
            />
          </button>
        </form>
      </div>
    </div>
  )
}


export default SearchField
