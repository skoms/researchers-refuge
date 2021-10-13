import React, { useState } from 'react'
import styles from './SearchField.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { selectDarkModeOn } from '../darkmodeButton/darkModeButtonSlice';
import { 
  updateSearchTerm,
  selectSearchTerm
} from './searchFieldSlice';
import { getIconUrl } from '../../Icons';

const SearchField = ({ isMobile }) => {
  const [mobileSearchActive, setMobileSearchActive] = useState(false);
  
  const searchTerm = useSelector(selectSearchTerm);
  const darkModeOn = useSelector(selectDarkModeOn);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const toggleMobileSearch = () => {
    setMobileSearchActive(!mobileSearchActive);
  }

  const submit = () => {
    history.push({ pathname: `/search/${searchTerm}`, state: { from: location.pathname }});
  }

  return !isMobile ? (
    <div className={styles.container}>
      <form onSubmit={submit}>
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
      <button className={styles.toggleMobileSearch} onClick={toggleMobileSearch}>
        <img 
          src={getIconUrl('magnifying-glass', darkModeOn, {
            size: 32,
            colors: {
              dark: '38B6FF',
              light: 'E8F7FF'
            }
          })}
          alt='search button'
        />
      </button>
      <div className={`${styles.mobileSearch} ${!mobileSearchActive && 'invisible'}`}>
        <form onSubmit={submit}>
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
