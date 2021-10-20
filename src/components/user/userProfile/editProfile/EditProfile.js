import Cookies from 'js-cookie';
import React, { useState } from 'react'
import styles from './EditProfile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Data from '../../../../utils/helpers/Data';
import { selectDarkModeOn } from '../../../darkmodeButton/darkModeButtonSlice';
import { selectTopic, updateTopic } from '../../../feed/feedSlice';
import TopicSelect from '../../../topicSelect/TopicSelect';
import TypedButton from '../../../typedButton/TypedButton';
import { selectAuthenticatedUser, updateAccount } from '../../userAccManage/userAccSlice';
import { getIconUrl } from '../../../../Icons';

const EditProfile = ({ toggleEdit }) => {
  const dispatch = useDispatch();
  const data = new Data();
  const history = useHistory();

  const [form, setForm] = useState('Profile');
  const darkModeOn = useSelector(selectDarkModeOn);
  const user = useSelector(selectAuthenticatedUser);
  const topic = useSelector(selectTopic);
  
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [occupation, setOccupation] = useState(user.occupation);
  const [bio, setBio] = useState(user.bio);
  const [email, setEmail] = useState(user.emailAddress);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const selectForm = (e) => {
    setForm(e.target.innerHTML);
  }
  const onChangeHandler = (e) => {
    switch (e.target.name) {
      case 'firstName':
        setFirstName(e.target.value);
        data.validateField('name', e.target.value, '#firstName-input-div')
        break;
      case 'lastName':
        setLastName(e.target.value);
        data.validateField('name', e.target.value, '#lastName-input-div')
        break;    
      case 'occupation':
        setOccupation(e.target.value);
        data.validateField('occupation', e.target.value, '#occupation-input-div')
        break;
      case 'bio':
        setBio(e.target.value);
        break; 
      case 'email':
        setEmail(e.target.value);
        data.validateField('email', e.target.value, '#email-input-div')
        break;
      case 'oldPass':
        setOldPassword(e.target.value);
        break;    
      case 'pass':
        setNewPassword(e.target.value);
        data.validateField('password', e.target.value, '#pass-input-div')
        break;
      case 'confPass':
        setConfirmPassword(e.target.value);
        const { classList } = e.target.parentElement;
        if ( e.target.value === newPassword ) {
          classList.contains('mismatch') && classList.remove('mismatch');
          !classList.contains('match') && classList.add('match');
          return true;
        } else if (e.target.value === '') {
          classList.contains('mismatch') && classList.remove('mismatch');
          classList.contains('match') && classList.remove('match');
        } else {
          !classList.contains('mismatch') && classList.add('mismatch');
          classList.contains('match') && classList.remove('match');
          return false;
        }
        break;
      default:
        break;
    }
  }
  const submit = async (e) => {
    e.preventDefault();
    const updatedData = {  };
    if (form === 'My Profile') {
      if (user.firstName !== firstName && 
          data.validateField('name', firstName, '#firstName-input-div')) updatedData.firstName = firstName;

      if (user.lastName !== lastName && 
          data.validateField('name', lastName, '#lastName-input-div')) updatedData.lastName = lastName;

      if (user.occupation !== occupation && 
          data.validateField('occupation', occupation, '#occupation-input-div')) updatedData.occupation = occupation;

      if (user.mostActiveField !== topic) updatedData.mostActiveField = topic;

      if (user.bio !== bio) updatedData.bio = bio;

    } else if (form === 'My Account') {
      if ( oldPassword === user.password ) {
        if (user.emailAddress !== email && 
          data.validateField('email', email, '#email-input-div')) updatedData.emailAddress = email;

        if (user.password !== newPassword && 
            newPassword === confirmPassword && 
            data.validateField('password', newPassword, '#pass-input-div')) {
            updatedData.password = newPassword;
      };
      } else {
        const { classList } = document.querySelector('#oldPass-input-div')
        !classList.contains('mismatch') && classList.add('mismatch');
      }
    }
    Object.keys(updatedData).length > 0 && await data.updateUser(form, user.id, updatedData, user)
      .then(res => {
        if (res.status === 204) {
          dispatch(updateAccount({ ...user, ...updatedData }));
          toggleEdit();
        } else {
          history.push('/forbidden');
        }
      })
      .catch((err) => {
        Cookies.set('error', err);
        history.push('/error');
      });
    dispatch(updateTopic('home'));
  }
  const cancel = (e) => {
    e.preventDefault();
    dispatch(updateTopic('home'));
    toggleEdit();
  }
  return (
    <div className={styles.container} onClick={(e) => toggleEdit(e)}>
      <div className={styles.editProfileContainer}>
        <div className={styles.editHeader}> 
          <h2>Edit</h2>
          <button className={styles.exitButton} onClick={(e) => {
            dispatch(updateTopic('home'));
            toggleEdit()
          }}>
            <img src={getIconUrl('x', darkModeOn, {size: 16, colors: {dark: 'E8F7FF', light: '1A3861'}})} alt='Exit button'/>
          </button>
        </div>
        <div className={styles.editSidebar}>
          <button onClick={selectForm}>Profile</button>
          <hr />
          <button onClick={selectForm}>Account</button>
        </div>
        <div className={styles.editMain}>
          { form === 'Profile' &&
            <form className={styles.editUserForm} onSubmit={submit}>
              <h1 className={styles.h1}>Profile</h1>
              <div className={`form-input ${styles.firstName}`} id='firstName-input-div'>
                <input id="firstName" name="firstName" type="text" value={ firstName } onChange={onChangeHandler}/>
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className={`form-input ${styles.lastName}`} id='lastName-input-div'>
                <input id="lastName" name="lastName" type="text" value={ lastName } onChange={onChangeHandler}/>
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div className={`form-input ${styles.occupation}`} id='occupation-input-div'>
                <input id="occupation" name="occupation" type="text" value={ occupation } onChange={onChangeHandler}/>
                <label htmlFor="occupation">Occupation</label>
              </div>
              <div className={`form-input ${styles.mostActiveField}`} id='mostActiveField-input-div'>
                <TopicSelect use='ArticleForm' />
                <label htmlFor="mostActiveField">Most Active Field: </label>
              </div>
              <div className={`form-input ${styles.bio}`} id='bio-input-div'>
              <textarea id="bio" name="bio"  rows='20' cols='60' value={ bio } onChange={onChangeHandler} placeholder='Uses Markdown formatting'/>
                <label htmlFor="bio">Bio</label>
                <a href="https://www.markdownguide.org/cheat-sheet" target='_blank' rel='noreferrer'>Cheat Sheet</a>
              </div>
              <div className={styles.formButtons}>
                <TypedButton 
                  buttontype='primary'
                  type='submit'
                  content='Update'
                />
                <TypedButton 
                  buttontype='secondary'
                  onClick={cancel} 
                  content='Cancel'
                />
              </div>
            </form>
          }
          { form === 'Account' &&
            <form className={styles.editAccountForm} onSubmit={submit}>
              <h1 className={styles.h1}>Account</h1>
              <div className={`form-input ${styles.oldPass}`} id='oldPass-input-div'>
                <input id="oldPass" name="oldPass" type="password" value={ oldPassword } onChange={onChangeHandler}/>
                <label htmlFor="oldPass">Current Password <span> *Required to update login info</span></label>
              </div>
              <div className={`form-input ${styles.email}`} id='email-input-div'>
                <input id="email" name="email" type="text" value={ email } onChange={onChangeHandler}/>
                <label htmlFor="email">Email</label>
              </div>
              <div className={`form-input ${styles.pass}`} id='pass-input-div'>
                <input id="pass" name="pass" type="password" value={ newPassword } onChange={onChangeHandler}/>
                <label htmlFor="pass">New Password</label>
              </div>
              <div className={`form-input ${styles.confPass}`} id='confPass-input-div'>
                <input id="confPass" name="confPass" type="password" value={ confirmPassword } onChange={onChangeHandler}/>
                <label htmlFor="confPass">Confirm Password</label>
              </div>
              <div className={styles.formButtons}>
                <TypedButton 
                  buttontype='primary'
                  type='submit'
                  content='Update'
                />
                <TypedButton 
                  buttontype='secondary'
                  onClick={cancel} 
                  content='Cancel'
                />
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  )
}

export default EditProfile
