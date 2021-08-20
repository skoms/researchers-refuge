import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import ArticleCards from '../../../article/articleCards/ArticleCards';
import { 
  selectAuthenticatedUser
} from '../../userAccManage/userAccSlice';
import {
  getUserInfo,
  getUserArticles
} from '../userFeedSlice';

const UserProfileFeed = props => {
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const [didLoad, setDidLoad] = useState(false);  
  const [owner, setOwner] = useState(props.owner ? authenticatedUser : null);

  if (authenticatedUser.id === parseInt(props.id)) {
    history.push('/my-profile')
  }

  useEffect(() => {
    const getOwnerInfo = async (id) => {
      console.log('dispatched!')
      await dispatch(getUserInfo(id))
        .then(res => res.payload)
        .then(res => {
          if (res.status === 200) {
            setOwner(res.user);
          } else if (res.status === 404) {
            history.push('/not-found');
          }
        })
    }
    if (!didLoad) {
      owner === null && getOwnerInfo(props.id);
      setDidLoad(true);
      console.log('Loaded');
    }
  }, [didLoad, owner, dispatch, history, props.id])

  return owner !== null ? (
      <div className="user-profile-div">
        <div className="user-profile-info-header">
          <div className="header-img-div">
            <img src="https://placeimg.com/1000/150/tech" alt="header"  className="header-img"/>
            <img 
              src={ owner.imgURL || "https://img.icons8.com/ios-glyphs/120/ffffff/user--v1.png" } 
              alt="profilepic" className={`profile-pic ${owner.imgURL ? "" : "placeholder"}`} 
            />
            { props.owner
            ?
              <button className='button-primary'>Edit Profile</button>
              
            :
              <button className='button-primary'>Follow</button>
            }
          </div>
          <div className="name-and-occupation">
            <h2 className="full-name">{`${owner.firstName} ${owner.lastName}`}</h2>
            <p className="occupation">{ owner.occupation || '' }</p>
          </div>
          <div className="stats">
            <div className="stat">
              <p className="title">Most active field:</p>
              <p className="data">{ owner.mostActiveField || 'None' }</p>
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
                { typeof owner.followers === 'object' ? owner.followers.length : 0 }
              </p>
            </div>
            <div className="stat">
              <p className="title">Following:</p>
              <p className="data">
                { typeof owner.following === 'object' ? owner.following.length : 0 }
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
          <ArticleCards />
        </div>
        <div className="articles-accredited">
          <h2 className="title">Articles Recently Accredited:</h2>
          <ArticleCards />
        </div>
      </div>
  )
  :
  <Fragment />
}

export default UserProfileFeed
