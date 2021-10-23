import React, { useEffect, useState } from 'react'
import styles from '../UserProfileFeed.module.css';
import { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import ArticleCards from '../../../article/articleCards/ArticleCards';
import ImageUploader from '../../../imageUploader/ImageUploader';
import { selectAuthenticatedUser } from '../../userAccManage/userAccSlice';
import EditProfile from '../editProfile/EditProfile';
import { getUserArticles } from '../userFeedSlice';
import { updateTopic } from '../../../feed/feedSlice';
import { selectPage } from '../../../paginationBar/paginationBarSlice';
import TypedButton from '../../../typedButton/TypedButton';
import { getIconUrl } from '../../../../Icons';
import { capitalize } from '../../../../utils/helpers';

const MyProfileFeed = () => {
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [didLoad, setDidLoad] = useState(false);
  const page = useSelector(selectPage);
  
  const [owner, setOwner] = useState(authenticatedUser);

  useEffect(() => {
    const getOwnersArticles = async (id) => {
      await dispatch(getUserArticles({id, page}))
        .catch(err => {
          console.error(err);
          history.push({ pathname: '/error', state: { from: location.pathname }})
        });
    }
    setOwner(authenticatedUser);
    if (!didLoad && owner) {
      getOwnersArticles(authenticatedUser.id);
      setDidLoad(true);
    }
  }, [didLoad, owner, dispatch, history, authenticatedUser, location.pathname, page])

  const toggleEdit = (e = null) => {
    if ((e !== null && e.target.className === 'edit-popup') || e === null) {
      const editProfilePopup = document.querySelector('.invisibility-container-edit');
      if ( editProfilePopup.classList.contains('invisible') ) {
        editProfilePopup.classList.remove('invisible');
      } else {
        editProfilePopup.classList.add('invisible');
        dispatch(updateTopic('home'));
      }
    }
  }

  const toggleHeaderUploader = (e = null) => {
    if ((e !== null 
      && (e.target.getAttribute('data-value') === 'upload-popup' || e.target.getAttribute('data-value') === 'header-img'))
      || e === null) {
      const headerImgPopup = document.querySelector('.invisibility-container-header');
      if ( headerImgPopup.classList.contains('invisible') ) {
        headerImgPopup.classList.remove('invisible');
      } else {
        headerImgPopup.classList.add('invisible');
      }
    }
  }

  const toggleProfileUploader = (e = null) => {
    if ((e !== null 
      && (e.target.getAttribute('data-value') === 'upload-popup' || e.target.getAttribute('data-value') === 'profile-pic'))
      || e === null) {
      const profilePicPopup = document.querySelector('.invisibility-container-profile');
      if ( profilePicPopup.classList.contains('invisible') ) {
        profilePicPopup.classList.remove('invisible');
      } else {
        profilePicPopup.classList.add('invisible');
      } 
    }
  }

  return owner !== null ? (
      <div className={styles.container}>

        <div className="invisibility-container-edit invisible">
          <EditProfile toggleEdit={toggleEdit} />
        </div>
        <div className="invisibility-container-header invisible">
          <ImageUploader toggleHeaderUploader={toggleHeaderUploader} purpose='header' />
        </div>
        <div className="invisibility-container-profile invisible">
          <ImageUploader toggleProfileUploader={toggleProfileUploader} purpose='profile' />
        </div>

        <div className={styles.infoHeader}>
          <div className={styles.headerImgDiv}>
            <img src={ owner.headerImgURL || "https://placeimg.com/1000/150/tech" }  alt="header"  className={styles.headerImg} data-value='header-img' onClick={toggleHeaderUploader} />
            <img 
              src={ owner.profileImgURL || getIconUrl('user-placeholder', null, {
                size: 120,
                colors: { light: 'FFFFFF' }
              })} 
              alt="profile pic" data-value='profile-pic' className={`${styles.profilePic} ${owner.profileImgURL ? "" : "placeholder"}`} 
              onClick={toggleProfileUploader}
            />
            <TypedButton 
              buttontype='primary'
              className={styles.button}
              onClick={() => toggleEdit()}
              content='Edit Profile'
            />
              
          </div>
          <div className={styles.nameOccupationAndBio}>
            <span className={styles.fullName}>
              <h2 className={styles.fullName}>
                { `${capitalize(owner.firstName)} ${capitalize(owner.lastName)}` }
              </h2>
              {owner.accessLevel === 'admin' ? 
                <img src={getIconUrl('admin-emblem', null, {
                  size: 24,
                  colors: { light: '38B6FF' }
                })} alt='admin icon'/> : ''}
            </span>
            
            <p className={styles.occupation}>{ capitalize(owner.occupation) || '' }</p>
            <ReactMarkdown className={styles.bio}>{ owner.bio || '' }</ReactMarkdown>
          </div>
          <div className={styles.stats}>
            <div className={`${styles.stat} most-active-field`}>
              <p className={styles.title}>Most active field:</p>
              <p className={styles.data}>{ capitalize(owner.mostActiveField) || 'None' }</p>
            </div>
            <div className={`${styles.stat} articles`}>
              <p className={styles.title}>Articles:</p>
              <p className={styles.data}>{ owner.articles || 0 }</p>
            </div>
            <div className={`${styles.stat} credits`}>
              <p className={styles.title}>Credits:</p>
              <p className={styles.data}>{ owner.credits || 0 }</p>
            </div>
            <div className={`${styles.stat} followers`}>
              <p className={styles.title}>Followers:</p>
              <p className={styles.data}>
                { owner.followers.length || 0 }
              </p>
            </div>
            <div className={`${styles.stat} following`}>
              <p className={styles.title}>Following:</p>
              <p className={styles.data}>
                { owner.following.length || 0 }
              </p>
            </div>
          </div>
        </div>
        <div className={styles.articlesPublishedContainer}>
          <h2 className={styles.title}>Articles Published:</h2>
          <ArticleCards type='ownersArticles' />
        </div>
        <div className={styles.articlesAccreditedContainer}>
          <h2 className={styles.title}>Articles Recently Accredited:</h2>
          <ArticleCards type='accreditedArticles' recentlyAccredited={owner.accreditedArticles} />
        </div>
      </div>
  )
  :
  <Fragment />
}

export default MyProfileFeed