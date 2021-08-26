import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { 
  selectAuthenticatedUser, 
  followUser,
} from '../user/userAccManage/userAccSlice';

const ResultRecUser = ({ user }) => {
  const authenticatedUser = useSelector(selectAuthenticatedUser);
  const [isFollowedByMe, setIsFollowedByMe] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [didLoad, setDidLoad] = useState(false);


  useEffect(() => {
    if (!didLoad && user) {
      console.log(user);
      setIsFollowedByMe(user.followers.includes(authenticatedUser.id));
      setDidLoad(true);
    }
  }, [didLoad, user, dispatch, authenticatedUser.id])

  const followUnfollow = async (e) => {
    const button = e.target;
    await dispatch(followUser({ id: user.id, user: authenticatedUser }))
      .then(res => res.payload)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          button.innerText = button.innerText === 'Follow' ? 'Unfollow' : 'Follow';
          user = {
            ...user,
            followers: res.users.target.followers.split(','),
            following: res.users.target.following.split(',')
          }
        }
      });
  }
  return (
    <div key={user.id} className="rec-user">
      <a href={`/users/${user.id}`} className="profile-pic" ><img src={user.imgURL} alt="profilepic" /></a>
      <a href={`/users/${user.id}`} className="full-name"><p>{`${user.firstName} ${user.lastName}`}</p></a>
      <p className="occupation">{user.occupation}</p>
      <div className="buttons">
        <button className='button-primary' onClick={followUnfollow}>{isFollowedByMe ? 'Unfollow' : 'Follow'}</button>
        <button className='button-secondary'>View</button>
      </div>
    </div>
  )
}

export default ResultRecUser
