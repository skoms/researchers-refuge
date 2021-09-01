import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import DarkModeButton from '../darkmodeButton/DarkModeButton';
import Cookies from 'js-cookie';

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

const Header = () => {
  const [didLoad, setDidLoad] = useState(false);
  const loggedIn = useSelector(selectLoggedIn);
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!didLoad) {
      dispatch(updateAccount(Cookies.get('authenticatedUser') ? JSON.parse(Cookies.get('authenticatedUser')) : null));
      dispatch(updateTopic(Cookies.get('topic') ? Cookies.get('topic') : 'home'));
      dispatch(getCategories());
      setDidLoad(true);
    }
  }, [authenticatedUser, didLoad, dispatch]);

  const LogOut = () => {
    dispatch(signOut());
  }

  return (
    <div className='header'>
      <a className='logo-home-a' href="/">
        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="logo" /> 
        <h2>Researchers' Refuge</h2>
      </a>
      <TopicSelect use='header' />
      <SearchField />
      { didLoad && loggedIn ?
        <div className='my-profile-div'>
          <DarkModeButton />
          <a href='/'><button className='signout-btn' onClick={LogOut}>Sign Out</button></a>
          <a href="/my-profile">My Profile</a>
          <img alt='your profile'
            src={ authenticatedUser.imgURL || "https://img.icons8.com/ios-glyphs/30/ffffff/user--v1.png" }
            className={ authenticatedUser.imgURL ? '' : 'placeholder' } 
          />
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
