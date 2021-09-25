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
import ReactMarkdown from 'react-markdown';
import { selectPage } from '../../../paginationBar/paginationBarSlice';

const UserProfileFeed = props => {
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const isFollowedByMe = useSelector(selectIsFollowedByMe);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const data = new Data();
  const page = useSelector(selectPage);
  const [didLoad, setDidLoad] = useState(false);
  
  const owner = useSelector(selectOwner);

  const [fetching, setFetching] = useState(false);

  if (authenticatedUser && authenticatedUser.id === parseInt(props.id)) {
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
      await dispatch(getUserArticles({id, page}))
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
      authenticatedUser && dispatch(updateIsFollowedByMe(owner.followers.includes(authenticatedUser.id)));
      setDidLoad(true);
    }
  }, [didLoad, owner, dispatch, history, props, authenticatedUser, fetching, location.pathname, page])

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
            <img src={ owner.headerImgURL || "https://placeimg.com/1000/150/tech" } alt="header"  className="header-img"/>
            <img 
              src={ owner.profileImgURL || "https://img.icons8.com/ios-glyphs/120/ffffff/user--v1.png" } 
              alt="profile-pic" className={`profile-pic ${owner.profileImgURL ? "" : "placeholder"}`} 
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
            <ReactMarkdown className="bio">{ owner.bio || '' }</ReactMarkdown>
          </div>
          <div className="stats">
            <div className="stat most-active-field">
              <p className="title">Most active field:</p>
              <p className="data">{ data.capitalize(owner.mostActiveField) || 'None' }</p>
            </div>
            <div className="stat articles">
              <p className="title">Articles:</p>
              <p className="data">{ owner.articles || 0 }</p>
            </div>
            <div className="stat credits">
              <p className="title">Credits:</p>
              <p className="data">{ owner.credits || 0 }</p>
            </div>
            <div className="stat followers">
              <p className="title">Followers:</p>
              <p className="data">
                { owner.followers.length || 0 }
              </p>
            </div>
            <div className="stat following">
              <p className="title">Following:</p>
              <p className="data">
                { owner.following.length || 0 }
              </p>
            </div>
          </div>
        </div>
        <div className="articles-published">
          <h2 className="title">Articles Published:</h2>
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
