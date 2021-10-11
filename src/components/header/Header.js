import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import DarkModeButton from '../darkmodeButton/DarkModeButton';
import Cookies from 'js-cookie';
import styles from './Header.module.css';

import SearchField from '../searchField/SearchField'
import {
  selectLoggedIn,
  selectAuthenticatedUser,
  signOut,
  updateAccount
} from '../user/userAccManage/userAccSlice';
import { updateTopic } from '../feed/feedSlice';
import { getCategories } from '../topics/topicsSlice';
import TopicSelect from '../topicSelect/TopicSelect';
import { useHistory, useLocation } from 'react-router-dom';
import { selectDarkModeOn } from '../darkmodeButton/darkModeButtonSlice';
import { selectIsMobile, updateWidth } from '../../app/screenWidthSlice';

const Header = () => {
  const [didLoad, setDidLoad] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

  const loggedIn = useSelector(selectLoggedIn);
  const isMobile = useSelector(selectIsMobile);
  const darkModeOn = useSelector(selectDarkModeOn);
  const authenticatedUser = useSelector(selectAuthenticatedUser);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!didLoad) {
      dispatch(updateAccount(Cookies.get('authenticatedUser') ? JSON.parse(Cookies.get('authenticatedUser')) : null));
      dispatch(updateTopic(Cookies.get('topic') ? Cookies.get('topic') : 'home'));
      dispatch(getCategories());
      setDidLoad(true);
    }
  }, [authenticatedUser, didLoad, dispatch]);

  useEffect(() => {
    window.addEventListener('resize', () => dispatch(updateWidth()));
    return () => {
        window.removeEventListener('resize', () => dispatch(updateWidth()));
    }
  }, [ dispatch ]);

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  }

  const LogOut = () => {
    dispatch(signOut());
  }

  return (
    <div className={styles.container}>
      <a className={styles.homeLogo} href="/">
        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="logo" /> 
        <h2>Researchers' Refuge</h2>
      </a>
      <SearchField isMobile={isMobile}/>
      {location.pathname === '/' && <TopicSelect use='header' />}
      { didLoad && loggedIn ?
        <div className={styles.loggedInNav}>
          <DarkModeButton />

          <div className={styles.menuProfileDiv}>
            { 
              <img 
                src={`https://img.icons8.com/material-outlined/24/${!dropdownActive ? 'ffffff' : (darkModeOn ? '38B6FF' : '161B22') }/menu--v1.png`} 
                className={styles.menuToggleButton}
                alt='menu toggle button'
                onClick={toggleDropdown}
              />
            }

            <img 
              src={ authenticatedUser.profileImgURL || "https://img.icons8.com/ios-glyphs/30/ffffff/user--v1.png" }
              className={ `${styles.profilePic} ${authenticatedUser.profileImgURL ? '' : 'placeholder'}` } 
              alt='your profile'
              onClick={() => history.push('/my-profile')}
            />
          </div>
          
          <div className={`${styles.dropdown} ${!dropdownActive && 'invisible'}`}>
            <a href="/my-profile">My Profile</a>
            <hr />
            <button className={styles.signOutButton} onClick={LogOut}>Sign Out</button>
          </div>
        </div>
      :
        <div className={styles.signButtons}>
          <DarkModeButton />
          <a href="/sign-in">
            <button>
              {!isMobile ? 'Sign In' : <img src='https://img.icons8.com/ios-filled/24/ffffff/login-rounded-right.png' alt='sign in button'/>}
            </button>
          </a>
          <a href="/sign-up">
            <button>
              {!isMobile ? 'Sign Up' : <img src='https://img.icons8.com/material-rounded/24/ffffff/edit-user-male.png' alt='sign up button'/>}
            </button>
          </a>
        </div>
      }
    </div>
  )
}

export default Header
