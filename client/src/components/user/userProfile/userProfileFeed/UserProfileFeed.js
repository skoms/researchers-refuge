import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import ArticleCards from '../../../article/articleCards/ArticleCards';
import Data from '../../../../Data';
import { 
  followUser,
  selectAuthenticatedUser
} from '../../userAccManage/userAccSlice';
import {
  getUserInfo,
  getUserArticles,
  updateIsFollowedByMe,
  selectIsFollowedByMe,
  selectOwner
} from '../userFeedSlice';

const UserProfileFeed = props => {
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const isFollowedByMe = useSelector(selectIsFollowedByMe);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const data = new Data();
  const [didLoad, setDidLoad] = useState(false);
  
  const owner = useSelector(selectOwner);

  const [fetching, setFetching] = useState(false);

  if (authenticatedUser.id === parseInt(props.id)) {
    history.push('/my-profile')
  }

  useEffect(() => {
    const getOwnerInfo = async (id) => {
      await dispatch(getUserInfo(id))
        .then(res => res.payload)
        .then(res => {
          if (res.status === 404) {
            history.push({ pathname: '/not-found', state: { from: location.pathname }});
          }
        })
        .catch(err => {
          console.error(err);
          history.push({ pathname: '/error', state: { from: location.pathname }})
        });
    }
    const getOwnersArticles = async (id) => {
      await dispatch(getUserArticles(id))
        .catch(err => {
          console.error(err);
          history.push({ pathname: '/error', state: { from: location.pathname }})
        });
    }
    if (fetching === false) {
      owner === null && getOwnerInfo(props.id);
      setFetching(true);
    }
    if (!didLoad && owner) {
      getOwnersArticles(props.id);
      dispatch(updateIsFollowedByMe(owner.followers.includes(authenticatedUser.id.toString())));
      setDidLoad(true);
    }
  }, [didLoad, owner, dispatch, history, props, authenticatedUser.id, fetching, location.pathname])

  const followUnfollow = async (e) => {
    const button = e.target;
    await dispatch(followUser({ id: props.id, user: authenticatedUser }))
      .then(res => res.payload)
      .then(res => {
        if (res.status === 200) {
          button.innerText = button.innerText === 'Follow' ? 'Unfollow' : 'Follow';
        }
      });
  }

  return owner !== null ? (
      <div className="user-profile-div">
        <div className="user-profile-info-header">
          <div className="header-img-div">
            <img src="https://placeimg.com/1000/150/tech" alt="header"  className="header-img"/>
            <img 
              src={ owner.imgURL || "https://img.icons8.com/ios-glyphs/120/ffffff/user--v1.png" } 
              alt="profilepic" className={`profile-pic ${owner.imgURL ? "" : "placeholder"}`} 
            />
            <button className='button-primary' onClick={followUnfollow} >
              { isFollowedByMe ? 'Unfollow' : 'Follow' }
            </button>
          </div>
          <div className="name-occupation-and-bio">
            <span className="full-name">
              <h2 className="full-name">
                { `${owner.firstName} ${owner.lastName}` }
              </h2>
              {owner.accessLevel === 'admin' ? 
                <img src="https://img.icons8.com/ios-glyphs/24/38B6FF/microsoft-admin--v2.png" alt='admin icon'/> : ''}
            </span>
            <p className="occupation">{ owner.occupation || '' }</p>
            <p className="bio">{ owner.bio || '' }</p>
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
                <option value="Techology">Techology</option>
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

export default UserProfileFeed
