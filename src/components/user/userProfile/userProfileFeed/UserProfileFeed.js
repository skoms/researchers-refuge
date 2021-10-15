import React, { useEffect, useState } from 'react'
import styles from '../UserProfileFeed.module.css';
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
import { updateType, updateTargetId, toggleIsActive } from '../../../reportModule/reportModuleSlice';
import ReactMarkdown from 'react-markdown';
import { selectPage } from '../../../paginationBar/paginationBarSlice';
import TypedButton from '../../../typedButton/TypedButton';
import { getIconUrl } from '../../../../Icons';

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

  const openReportModule = () => {
    dispatch(updateType('User'));
    dispatch(updateTargetId(props.id));
    dispatch(toggleIsActive(true));
  }

  return owner !== null ? (
      <div className={styles.container}>
        <div className={styles.infoHeader}>

          <div className={styles.headerImgDiv}>
            <img src={ owner.headerImgURL || "https://placeimg.com/1000/150/tech" } alt="header"  className={styles.headerImg}/>
            <img 
              src={ owner.profileImgURL || getIconUrl('user-placeholder', null, {
                  size: 120,
                  colors: { light: 'FFFFFF' }
                })
              } 
              alt="profile-pic" className={`${styles.profilePic} ${owner.profileImgURL ? "" : "placeholder"}`} 
            />
            <TypedButton
              buttontype='primary'
              className={styles.button}
              onClick={followUnfollow}
              content={ isFollowedByMe ? 'Unfollow' : 'Follow' }
            />
            <TypedButton
              buttontype='secondary'
              className={styles.reportButton}
              onClick={openReportModule}
              content={
                <>
                  <img 
                    className={styles.reportIcon}
                    src={getIconUrl('letter-and-paper', null, {
                      size: 16,
                      colors: {
                        light: 'FFFFFF'
                      }
                    })}
                    alt='report icon'
                  />
                  <span> Report User</span>
                </>
              }
            />
          </div>

          <div className={styles.nameOccupationAndBio}>
            <span className={styles.fullName}>
              <h2 className={styles.fullName}>
                { `${owner.firstName} ${owner.lastName}` }
              </h2>
              {owner.accessLevel === 'admin' ? 
                <img src={getIconUrl('admin-emblem', null, {
                  size: 24,
                  colors: { light: '38B6FF' }
                })} alt='admin icon'/> : ''}
            </span>
            <p className={styles.occupation}>{ owner.occupation || '' }</p>
            <ReactMarkdown className="bio">{ owner.bio || '' }</ReactMarkdown>
          </div>

          <div className={styles.stats}>
            <div className={`${styles.stat} most-active-field`}>
              <p className={styles.title}>Most active field:</p>
              <p className={styles.data}>{ data.capitalize(owner.mostActiveField) || 'None' }</p>
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

export default UserProfileFeed
