import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DarkModeButton from '../darkmodeButton/DarkModeButton'
import Cookies from 'js-cookie'
import styles from './Header.module.css'
import useUpdateEffect from '../../customHooks/useUpdateEffect'

import SearchField from '../searchField/SearchField'
import {
  selectLoggedIn,
  selectAuthenticatedUser,
  signOut,
  updateAccount,
} from '../user/userAccManage/userAccSlice'
import { updateTopic } from '../feed/feedSlice'
import { getCategories } from '../topics/topicsSlice'
import TopicSelect from '../topicSelect/TopicSelect'
import { useHistory, useLocation } from 'react-router-dom'
import { selectDarkModeOn } from '../darkmodeButton/darkModeButtonSlice'
import { selectIsMobile, updateWidth } from '../../app/screenWidthSlice'
import { getIconUrl } from '../../Icons'
import {
  toggleIsActive,
  updateTargetId,
  updateType,
} from '../reportModule/reportModuleSlice'
import useToggle from '../../customHooks/useToggle'
import useFirstVisitAlert from '../../customHooks/useFirstVisitAlert'
import { checkIfAdmin } from '../../utils/helpers'

const Header = () => {
  const [didLoad, setDidLoad] = useState(false)
  const [dropdownActive, toggleDropdownActive] = useToggle(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const dropdownRef = useRef()

  const loggedIn = useSelector(selectLoggedIn)
  const isMobile = useSelector(selectIsMobile)
  const darkModeOn = useSelector(selectDarkModeOn)
  const authenticatedUser = useSelector(selectAuthenticatedUser)

  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  useFirstVisitAlert(
    `Hello there, new visitor!

    This website is for learning and displaying skills mainly and is not intended for commercial use. If you want to test the website you can either sign up, or just use this demo user:

    Email: demo@user.com | Password: demoUser123

    Thank you for visiting my page.`,
  )

  useEffect(() => {
    if (!didLoad) {
      dispatch(
        updateAccount(
          Cookies.get('authenticatedUser')
            ? JSON.parse(Cookies.get('authenticatedUser'))
            : null,
        ),
      )
      dispatch(
        updateTopic(Cookies.get('topic') ? Cookies.get('topic') : 'home'),
      )
      dispatch(getCategories())
      setDidLoad(true)
    }
    if (authenticatedUser) {
      checkIfAdmin(authenticatedUser).then(setIsAdmin)
    }
  }, [authenticatedUser, didLoad, dispatch])

  useEffect(() => {
    window.addEventListener('resize', () => dispatch(updateWidth()))
    return () => {
      window.removeEventListener('resize', () => dispatch(updateWidth()))
    }
  }, [dispatch])

  useUpdateEffect(() => {
    const pageClickEvent = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        toggleDropdownActive(false)
      }
    }
    dropdownActive && window.addEventListener('click', pageClickEvent)
    return () => window.removeEventListener('click', pageClickEvent)
  }, [dropdownActive, toggleDropdownActive])

  const openReportModule = () => {
    dispatch(updateType('Bug'))
    dispatch(updateTargetId(0))
    dispatch(toggleIsActive(true))
  }

  const LogOut = () => {
    dispatch(signOut())
  }

  return (
    <div className={styles.container} data-testid="header-component">
      <a className={styles.homeLogo} href="/">
        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="logo" />
        <h2>Researchers' Refuge</h2>
      </a>
      <SearchField />
      {location.pathname === '/' && <TopicSelect use="header" />}
      {didLoad && loggedIn ? (
        <div className={styles.loggedInNav}>
          <DarkModeButton />

          <div className={styles.menuProfileDiv}>
            {
              <img
                src={getIconUrl('tri-stripe', darkModeOn, {
                  size: 24,
                  colors: {
                    dark: !dropdownActive ? 'ffffff' : '38B6FF',
                    light: !dropdownActive ? 'ffffff' : '161B22',
                  },
                })}
                className={styles.menuToggleButton}
                alt="menu toggle button"
                onClick={toggleDropdownActive}
              />
            }

            <img
              src={
                authenticatedUser.profileImgURL ||
                getIconUrl('user-placeholder', null, {
                  size: 30,
                  colors: { light: 'FFFFFF' },
                })
              }
              className={`${styles.profilePic} ${
                authenticatedUser.profileImgURL ? '' : 'placeholder'
              }`}
              alt="your profile"
              onClick={() => history.push('/my-profile')}
            />
          </div>

          <div
            className={`${styles.dropdown} ${!dropdownActive && 'invisible'}`}
            ref={dropdownRef}
            data-testid="header-dropdown-menu"
          >
            <a href="/my-profile">My Profile</a>
            <hr />
            {isAdmin && (
              <>
                <a href="/admin-panel">Admin Panel</a>
                <hr />
              </>
            )}
            <button className={styles.menuButton} onClick={openReportModule}>
              Report Bug
            </button>
            <hr />
            <button className={styles.menuButton} onClick={LogOut}>
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.signButtons}>
          <DarkModeButton />
          <a href="/sign-in">
            <button>
              {!isMobile ? (
                'Sign In'
              ) : (
                <img
                  src={getIconUrl('sign-in', null, {
                    size: 30,
                    colors: { light: 'FFFFFF' },
                  })}
                  alt="sign in button"
                />
              )}
            </button>
          </a>
          <a href="/sign-up">
            <button>
              {!isMobile ? (
                'Sign Up'
              ) : (
                <img
                  src={getIconUrl('sign-up', null, {
                    size: 30,
                    colors: { light: 'FFFFFF' },
                  })}
                  alt="sign up button"
                />
              )}
            </button>
          </a>
        </div>
      )}
    </div>
  )
}

export default Header
