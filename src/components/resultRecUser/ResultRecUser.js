import React from 'react'
import styles from './ResultRecUser.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { 
  selectAuthenticatedUser, 
  followUser,
} from '../user/userAccManage/userAccSlice';
import { useLocation } from 'react-router-dom';
import TypedButton from '../typedButton/TypedButton';
import { capitalize } from '../../utils/helpers';

const ResultRecUser = ({ user }) => {
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const [isFollowedByMe, setIsFollowedByMe] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [didLoad, setDidLoad] = useState(false);


  useEffect(() => {
    if (!didLoad && user) {
      authenticatedUser && setIsFollowedByMe(user.followers.includes(authenticatedUser.id));
      setDidLoad(true);
    }
  }, [didLoad, user, dispatch, authenticatedUser])

  const followUnfollow = async (e) => {
    const button = e.target;
    const response = await dispatch(followUser({ id: user.id, user: authenticatedUser }))
      .then(res => res.payload)
      .then(res => {
        if (res.status === 200) {
          button.innerText = button.innerText === 'Follow' ? 'Unfollow' : 'Follow';
        }
      });
    return response;
  }

  const view = () => {
    history.push({ pathname: `/users/${user.id}`, state: { from: location.pathname }});
  }

  return (
    <div key={user.id} className={styles.container}>
      <a href={`/users/${user.id}`} className={styles.profilePic}>
        <img src={user.profileImgURL} alt="profile-pic" />
      </a>
      <a href={`/users/${user.id}`} className={styles.fullName}><p>{capitalize(`${user.firstName} ${user.lastName}`, false)}</p></a>
      <p className={styles.occupation}>{capitalize(user.occupation, false)}</p>
      <div className={styles.buttons}>
        <TypedButton 
          buttontype='primary' 
          content={isFollowedByMe ? 'Unfollow' : 'Follow'} 
          onClick={followUnfollow}
        />
        <TypedButton 
          buttontype='secondary'
          content='View'
          onClick={view}
        />
      </div>
    </div>
  )
}

export default ResultRecUser
