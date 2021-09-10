import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { selectDarkModeOn } from '../darkmodeButton/darkModeButtonSlice';
import { 
  updateSearchTerm,
  selectSearchTerm
} from './searchFieldSlice';

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
    <div className="search">
      <form onSubmit={submit}>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => dispatch(updateSearchTerm(e.target.value))}
          placeholder="Search for articles or people"
        />
        <button className='search-button' type='submit'>
          <img 
            src={`https://img.icons8.com/material-outlined/20/${ darkModeOn ? '38B6FF' : 'E8F7FF' }/search--v1.png`}
            alt='search button'
          />
        </button>
      </form>
    </div>
  ) : (
    <div className="search">
      <button className="toggle-mobile-search" onClick={toggleMobileSearch}>
        <img 
          src={`https://img.icons8.com/material-outlined/32/${ darkModeOn ? '38B6FF' : 'E8F7FF' }/search--v1.png`}
          alt='search button'
        />
      </button>
      <div className={`mobile-search ${!mobileSearchActive && 'invisible'}`}>
        <form onSubmit={submit}>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => dispatch(updateSearchTerm(e.target.value))}
            placeholder="Search for articles or people"
          />
          <button className='search-button' type='submit'>
            <img 
              src={`https://img.icons8.com/material-outlined/20/${ darkModeOn ? '38B6FF' : 'E8F7FF' }/search--v1.png`}
              alt='search button'
            />
          </button>
        </form>
      </div>
    </div>
  )
}


export default SearchField
