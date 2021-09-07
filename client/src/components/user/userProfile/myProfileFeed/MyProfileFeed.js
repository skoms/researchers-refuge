import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import Data from '../../../../Data';
import ArticleCards from '../../../article/articleCards/ArticleCards';
import ImageUploader from '../../../imageUploader/ImageUploader';
import { selectAuthenticatedUser } from '../../userAccManage/userAccSlice';
import EditProfile from '../editProfile/EditProfile';
import { getUserArticles } from '../userFeedSlice';

const MyProfileFeed = () => {
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [didLoad, setDidLoad] = useState(false);
  const data = new Data();
  
  const [owner, setOwner] = useState(authenticatedUser);

  useEffect(() => {
    const getOwnersArticles = async (id) => {
      await dispatch(getUserArticles(id))
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
  }, [didLoad, owner, dispatch, history, authenticatedUser, location.pathname])

  const toggleEdit = (e = null) => {
    if ((e !== null && e.target.className === 'edit-popup') || e === null) {
      const editProfilePopup = document.querySelector('.invisibility-container-edit');
      if ( editProfilePopup.classList.contains('invisible') ) {
        editProfilePopup.classList.remove('invisible');
      } else {
        editProfilePopup.classList.add('invisible');
      }
    }
  }

  const toggleHeaderUploader = (e = null) => {
    if ((e !== null 
      && (e.target.className === 'upload-popup' || e.target.className === 'header-img'))
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
      && (e.target.className === 'upload-popup' || e.target.classList.contains('profile-pic')))
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
      <div className="user-profile-div">

        <div className="invisibility-container-edit invisible">
          <EditProfile toggleEdit={toggleEdit} />
        </div>
        <div className="invisibility-container-header invisible">
          <ImageUploader toggleHeaderUploader={toggleHeaderUploader} purpose='header' />
        </div>
        <div className="invisibility-container-profile invisible">
          <ImageUploader toggleProfileUploader={toggleProfileUploader} purpose='profile' />
        </div>

        <div className="user-profile-info-header">
          <div className="header-img-div">
            <img src={ owner.headerImgURL || "https://placeimg.com/1000/150/tech" }  alt="header"  className="header-img" onClick={toggleHeaderUploader} />
            <img 
              src={ owner.profileImgURL || "https://img.icons8.com/ios-glyphs/120/ffffff/user--v1.png" } 
              alt="profile pic" className={`profile-pic ${owner.profileImgURL ? "" : "placeholder"}`} 
              onClick={toggleProfileUploader}
            />
            <button className='button-primary' onClick={() => toggleEdit()}>Edit Profile</button>
              
          </div>
          <div className="name-occupation-and-bio">
            <span className="full-name">
              <h2 className="full-name">
                { `${data.capitalize(owner.firstName)} ${data.capitalize(owner.lastName)}` }
              </h2>
              {owner.accessLevel === 'admin' ? 
                <img src="https://img.icons8.com/ios-glyphs/24/38B6FF/microsoft-admin--v2.png" alt='admin icon'/> : ''}
            </span>
            
            <p className="occupation">{ data.capitalize(owner.occupation) || '' }</p>
            <ReactMarkdown className="bio">{ owner.bio || '' }</ReactMarkdown>
          </div>
          <div className="stats">
            <div className="stat">
              <p className="title">Most active field:</p>
              <p className="data">{ data.capitalize(owner.mostActiveField) || 'None' }</p>
            </div>
            <div className="stat most-active-field">
              <p className="title">Articles:</p>
              <p className="data">{ owner.articles || 0 }</p>
            </div>
            <div className="stat">
              <p className="title">Credits:</p>
              <p className="data">{ owner.credits || 0 }</p>
            </div>
            <div className="stat">
              <p className="title">Followers:</p>
              <p className="data">
                { owner.followers.length || 0 }
              </p>
            </div>
            <div className="stat">
              <p className="title">Following:</p>
              <p className="data">
                { owner.following.length || 0 }
              </p>
            </div>
          </div>
        </div>
        <div className="articles-published">
          <h2 className="title">Articles Published:</h2>
          {/* Connect sorting feature for the articles */}
          <div className="sort-nav">
            <div>
              <label htmlFor='order-select'>Sort by: </label>
              <select name="order-select" id="order-select">
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Most Credits">Most Credits</option>
                <option value="Least Credits">Least Credits</option>
              </select>
            </div>
            <div>
              <label htmlFor='topic-select'>Topic: </label>
              <select name="topic-select" id="topic-select">
                <option className='default' value="">Select a topic</option>
                <option value="Astrology">Astrology</option>
                <option value="Technology">Technology</option>
                <option value="Psychology">Psychology</option>
                <option value="Archeology">Archeology</option>
                <option value="Physics">Physics</option>
              </select>
            </div>
            
          </div>
          <ArticleCards type='ownersArticles' />
        </div>
        <div className="articles-accredited">
          <h2 className="title">Articles Recently Accredited:</h2>
          <ArticleCards type='accreditedArticles' recentlyAccredited={owner.accreditedArticles} />
        </div>
      </div>
  )
  :
  <Fragment />
}

export default MyProfileFeed